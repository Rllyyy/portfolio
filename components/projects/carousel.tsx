import { useState, useEffect, useCallback, useSyncExternalStore, FormEvent } from "react";
import { animate, PanInfo, useMotionValue, ValueAnimationTransition } from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";

import Arrow from "./arrow";
import Slider from "./slider";
import Dots from "./dots";

import projects from "./projects.json";

// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

const transition: ValueAnimationTransition<number> = {
  type: "spring",
  bounce: 0,
};

interface ICarousel {
  items: (typeof projects)[number]["carouselItems"];
  unoptimizedImages?: boolean;
}

export const Carousel: React.FC<ICarousel> = ({ items, unoptimizedImages = false }) => {
  const x = useMotionValue(0); // Track the horizontal position of the carousel
  const [index, setIndex] = useState(0);
  let [ref, { width }] = useMeasure(); // Measure the width of the carousel container

  // Calculates the new value for x based on the current index and width
  const calculateNewX = useCallback(() => {
    return -index * (width || 0);
  }, [index, width]);

  const handleEndDrag = (e: Event, dragProps: PanInfo) => {
    const clientWidth = width || 0;

    const { offset } = dragProps;

    // Determines whether to go to the previous or next slide, or stay on the current slide
    if (offset.x > clientWidth / 4) {
      handlePrev();
    } else if (offset.x < -clientWidth / 4) {
      handleNext();
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  // Update index to next item or to beginning if at the end
  const handleNext = () => {
    setIndex((prev) => (prev + 1 === items.length ? 0 : prev + 1));
  };

  // Update index to previous item or to end if at the beginning
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 < 0 ? items.length - 1 : prev - 1));
  };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index, calculateNewX, x]);

  return (
    <>
      {/* left arrow */}
      <Arrow onClick={handlePrev} direction='previous'>
        <ChevronLeft />
      </Arrow>
      <div ref={ref} className='relative flex items-center w-full h-full overflow-x-hidden'>
        {items.map((item, itemIndex) => {
          /*           console.log(`${item.resource}: ${itemIndex <= index + 1 ? "eager" : "lazy"}`); */
          return (
            <Slider onDragEnd={handleEndDrag} totalSliders={items.length} x={x} key={item.resource}>
              {item.type === "image" ? (
                <Image
                  draggable='false'
                  src={item.resource}
                  width={650}
                  height={520}
                  alt={item.alt as string}
                  /* also check that item is in view + instead of preloading the next item use something like itemIndex <= index + 1 ? "eager" : "lazy" */
                  /* This is kinda bad because it will unoptimize the images if the index is 0 again or the user moves backwards */
                  loading={itemIndex <= index + 1 ? "eager" : "lazy"}
                  className='object-contain w-full max-h-full p-[1px]'
                  unoptimized={unoptimizedImages}
                />
              ) : (
                <Video resource={item.resource} />
              )}
            </Slider>
          );
        })}
      </div>
      {/* right arrow */}
      <Arrow onClick={handleNext} direction='next'>
        <ChevronRight />
      </Arrow>
      {/* dots */}
      <Dots length={items.length} setActiveIndex={setIndex} activeIndex={index} />
    </>
  );
};

// SVG to move right in the carousel
const ChevronRight = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className='w-8 h-8 font-bold text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
    </svg>
  );
};

// SVG to move left in the carousel
const ChevronLeft = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={2}
      stroke='currentColor'
      className='w-8 h-8 font-bold text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
    </svg>
  );
};

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
