import Image from "next/image";
import { Carousel } from "./carousel";
import projects from "./projects.json";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ThickUnderline } from "components/icons/underline";

export const Projects = () => {
  const viewportAmount = useViewportAmount();

  return (
    <section className='px-4 py-16 lg:px-6 md:py-24 bg-zinc-50 dark:bg-zinc-900' id='projects'>
      <div className='flex flex-col items-center gap-12 md:gap-16 w-[min(100%,_1600px)] m-auto'>
        <div className='flex flex-col items-start w-full md:items-center gap-y-4'>
          <h2 className='relative text-5xl font-semibold'>
            Projects
            <ThickUnderline />
          </h2>
        </div>
        <div className='space-y-6 lg:space-y-16'>
          {projects.map((project, index) => {
            return (
              <motion.article
                className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-md lg:rounded-lg lg:flex-row lg:border-none dark:border-gray-700 lg:min-h-[650px]'
                key={project.name}
                initial={{ opacity: 0, x: index % 2 !== 0 ? "15%" : "-15%" }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: viewportAmount }}
              >
                <div
                  className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 w-full lg:w-[50%]  lg:h-[650px] h-[400px] lg:max-h-none relative ${
                    index % 2 !== 0 ? "lg:order-0" : "lg:order-1"
                  }`}
                >
                  <Carousel>
                    {project.carouselItems?.map((item, i) => {
                      if (item.type === "image") {
                        return (
                          <div key={i} className='relative w-full'>
                            <Image
                              draggable='false'
                              src={item.resource}
                              fill
                              sizes='(max-width: 768px) 100vw, 700px'
                              alt={item.alt as string}
                              className='object-contain w-full max-h-full p-[1px]'
                            />
                          </div>
                        );
                      } else if (item.type === "video") {
                        return <Video key={i} resource={item.resource} />;
                      }
                    })}
                  </Carousel>
                </div>
                <div className='flex flex-col justify-center lg:w-[50%] bg-zinc-100 dark:bg-zinc-800 p-6 lg:p-8 flex-grow self-stretch '>
                  <h3 className='text-3xl font-semibold'>{project.name}</h3>
                  <div className='flex flex-wrap gap-2 mt-2' aria-label='Project tech stack'>
                    {project.technologies.map((technology) => {
                      return (
                        <span
                          className='px-3 py-1 text-sm font-semibold leading-none rounded-full bg-zinc-300 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                          key={`${technology}-${project.name}`}
                        >
                          {technology}
                        </span>
                      );
                    })}
                  </div>
                  <p className='my-4 text-lg text-zinc-700 dark:text-zinc-200'>{project.description}</p>
                  <div className='flex items-stretch gap-x-2'>
                    {project.links?.primary && (
                      <a
                        className='p-1 text-lg font-semibold text-white bg-indigo-600 rounded-lg cursor-pointer hover:no-underline hover:bg-indigo-700 w-[min(50%,_150px)] text-center duration-150 flex items-center justify-center border border-indigo-600 hover:border-indigo-600'
                        href={project.links?.primary.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {project.links?.primary.text}
                      </a>
                    )}
                    {project.links?.secondary && (
                      <a
                        className='px-4 py-1 text-lg font-semibold text-indigo-600 duration-150 border border-indigo-600 rounded-lg cursor-pointer hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:text-indigo-100'
                        href={project.links.secondary.link}
                        target='_blank'
                        rel='noreferrer'
                      >
                        {project.links.secondary.text}
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const useViewportAmount = () => {
  const value = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0
  );

  if (value <= 850) {
    return 0.1;
  } else if (value <= 1100) {
    return 0.2;
  } else {
    return 0.4;
  }
};

// Add event listener for window resizing
function subscribe(onWindowResize: () => void) {
  window.addEventListener("resize", onWindowResize);

  return () => window.removeEventListener("resize", onWindowResize);
}

//this is the subscribe function, listens for changes
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
  resource: (typeof projects)[number]["carouselItems"][number]["resource"];
}
export const Video: React.FC<IVideo> = ({ resource }) => {
  // Get consent from localStorage
  const hasYouTubeConsentLocalStorage: boolean = useSyncExternalStore(
    subscribeToLocalStorage,
    getLocalStorageSnapShot,
    () => undefined
  );

  // Get consent form session storage if the user did not check "Do not show again"
  const hasYouTubeConsentSessionStorage: boolean = useSyncExternalStore(
    subscribeToSessionStorage,
    getSessionStorageSnapShot,
    () => undefined
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      className='flex flex-col w-full h-full p-3 bg-gray-900 rounded md:p-6 md:gap-y-2 gap-y-1 md:max-h-[350px] my-auto dark:bg-black'
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
