import { useState, Children, useEffect, useCallback, useMemo } from "react";
import { animate, PanInfo, useMotionValue, ValueAnimationTransition } from "motion/react";
import useMeasure from "react-use-measure";

import Arrow from "./arrow";
import Slider from "./slider";
import Dots from "./dots";

// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

const transition: ValueAnimationTransition<number> = {
  type: "spring",
  bounce: 0,
};

export const Carousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const childrens = useMemo(() => Children.toArray(children), [children]);

  // Update index to next item or to beginning if at the end
  const handleNext = () => {
    setIndex((prev) => (prev + 1 === childrens.length ? 0 : prev + 1));
  };

  // Update index to previous item or to end if at the beginning
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 < 0 ? childrens.length - 1 : prev - 1));
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
        {childrens.map((child, i) => (
          <Slider onDragEnd={handleEndDrag} totalSliders={childrens.length} x={x} key={i}>
            {child}
          </Slider>
        ))}
      </div>
      {/* right arrow */}
      <Arrow onClick={handleNext} direction='next'>
        <ChevronRight />
      </Arrow>
      {/* dots */}
      <Dots length={childrens.length} setActiveIndex={setIndex} activeIndex={index} />
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
