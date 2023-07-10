import Image from "next/image";
import { motion } from "framer-motion";
import { EMailIcon } from "components/icons/email";

export const LandingPage = () => {
  return (
    <section className='md:min-h-[75vh] min-h-[50vh] grid grid-rows-[max-content_1fr] md:grid-rows-1 md:grid-cols-2 gap-y-6 md:gap-x-8 lg:gap-x-28 lg:px-6 px-4 py-10 md:py-32 md:mt-24 mt-20 justify-items-center md:items-center'>
      <div className='flex flex-col items-start order-2 w-full max-w-4xl space-y-4 md:justify-center justify-self-end md:space-y-8 md:order-1'>
        <motion.h2
          className='text-base md:text-xl text-zinc-600 dark:text-zinc-400'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          Niklas Fischer | Portfolio
        </motion.h2>
        <motion.h1
          className='text-5xl font-semibold md:text-7xl'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Developing Solutions
        </motion.h1>
        <motion.p
          className='text-base md:text-xl text-zinc-700 dark:text-zinc-300'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Hi, I am an aspiring <b>Web Developer</b> looking for my first real job experience :)
        </motion.p>
        <motion.div
          className='flex flex-row flex-wrap w-full gap-x-4 gap-y-2'
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <a
            className='text-lg md:text-xl font-semibold  text-white bg-indigo-600 rounded-lg cursor-pointer w-full max-w-[160px] text-center hover:no-underline hover:bg-indigo-700 outline-offset-8 outline-indigo-600 h-11 flex items-center justify-center px-2'
            href='#projects'
          >
            View Projects
          </a>
          <a
            className='flex flex-row items-center px-4 space-x-2 text-lg text-center text-indigo-600 duration-100 border border-indigo-600 rounded-lg cursor-pointer md:text-xl dark:text-indigo-100 dark:border-indigo-500 hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-700 h-11'
            href='mailto:niklas.fischer@mail.de'
          >
            <EMailIcon />
            <span>Let&apos;s Talk</span>
          </a>
        </motion.div>
      </div>
      <motion.div
        className='relative order-1 w-full md:h-full md:order-2 max-w-[290px] md:max-w-[800px] md:justify-self-start h-[290px]'
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Image
          src='/hero-image.png'
          className='object-scale-down w-full h-full'
          alt='an isometric home office with a computer desk, lamps and plants, in the style of 2d game art, navy and blue'
          priority
          fill
          sizes='(max-width: 768px) 300px, 800px'
        />
      </motion.div>
    </section>
  );
};
