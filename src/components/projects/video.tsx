"use client";

import { SubmitEventHandler, useState, useSyncExternalStore } from "react";

const subscribeToLocalStorage = (listener: () => void) => {
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener("storage", listener);
  };
};

const getLocalStorageSnapShot = () => {
  const item = localStorage.getItem("youtube-consent");
  if (!item) {
    return undefined;
  }

  return JSON.parse(item);
};

const subscribeToSessionStorage = (listener: () => void) => {
  window.addEventListener("session-storage", listener);
  return () => {
    window.removeEventListener("session-storage", listener);
  };
};

const getSessionStorageSnapShot = () => {
  const item = sessionStorage.getItem("youtube-consent");
  if (!item) {
    return undefined;
  }

  return JSON.parse(item);
};

interface IVideo {
  resource: string;
}

export const Video: React.FC<IVideo> = ({ resource }) => {
  // Get consent from localStorage
  const hasYouTubeConsentLocalStorage: boolean = useSyncExternalStore(
    subscribeToLocalStorage,
    getLocalStorageSnapShot,
    () => undefined,
  );

  // Get consent form session storage if the user did not check "Do not show again"
  const hasYouTubeConsentSessionStorage: boolean = useSyncExternalStore(
    subscribeToSessionStorage,
    getSessionStorageSnapShot,
    () => undefined,
  );

  if (!hasYouTubeConsentLocalStorage && !hasYouTubeConsentSessionStorage) {
    return <YouTubeConsentForm />;
  }

  return (
    <div className='relative w-full h-full'>
      <div
        className='absolute w-full max-h-full left-1/2 top-1/2'
        style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
      >
        <div
          /* Weird workaround to not get scrollbars on md screen */
          className='relative w-full md:mx-auto md:w-[70%] lg:w-full '
          style={{
            aspectRatio: "16 / 9",
          }}
        >
          <iframe
            src={resource}
            title='YouTube video player'
            className='object-contain w-full h-full'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const YouTubeConsentForm = () => {
  const [doNotShowAgain, setDoNotShowAgain] = useState(true);

  const handleChange = () => {
    setDoNotShowAgain((prev) => !prev);
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (doNotShowAgain) {
      // Update localStorage
      localStorage.setItem("youtube-consent", JSON.stringify(true));
      window.dispatchEvent(new Event("storage"));
    } else {
      // Update session storage
      sessionStorage.setItem("youtube-consent", JSON.stringify(true));
      window.dispatchEvent(new Event("session-storage"));
    }
  };

  return (
    <form
      className='flex flex-col w-full h-full p-3 bg-gray-900 rounded md:p-6 md:gap-y-2 gap-y-1 md:max-h-87.5 my-auto dark:bg-black'
      onSubmit={handleSubmit}
    >
      <h3 className='font-bold text-zinc-50 md:text-xl'>Activate external Media</h3>
      <p className='text text-zinc-200'>
        By clicking on the play button, you consent to YouTube setting cookies on the device you are using which can be
        used for market research and marketing purposes.{" "}
        <a href='https://policies.google.com/technologies/types?hl=de' className='text-indigo-400'>
          YouTube Cookie-Policy
        </a>
      </p>
      <div className='mt-auto space-x-2'>
        <input type='checkbox' id='not-show-again' checked={doNotShowAgain} onChange={handleChange} />
        <label htmlFor='not-show-again' className='text-zinc-200'>
          Do not show again
        </label>
      </div>
      <button type='submit' className='block p-2 font-semibold bg-indigo-600 rounded text-zinc-100 hover:bg-indigo-700'>
        I understand
      </button>
    </form>
  );
};
