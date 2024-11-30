"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EMailIcon } from "@/components/icons/email";
import { Icon } from "../icons";

export function Card() {
  return (
    <motion.div
      className='flex flex-col justify-between h-full overflow-hidden rounded-lg shadow-xl '
      initial={{ opacity: 0.2 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-120px" }}
    >
      <div className='flex flex-col items-center h-full p-8 bg-gray-300 md:p-12 dark:bg-gray-700 gap-y-6'>
        <div className='relative w-40 h-40 overflow-hidden rounded-full md:w-48 md:h-48'>
          <Image
            src='/images/profile-image.png'
            alt='Profile Picture'
            fill
            className='object-cover scale-105 rounded-1/2'
          />
        </div>
        <h2 className='text-2xl font-medium'>Niklas Fischer</h2>
        <hr className='w-20 h-0.5 bg-indigo-600 border-0 dark:bg-indigo-500' />
        <h3 className='text-lg text-gray-700 dark:text-gray-200'>Web Developer</h3>
      </div>
      <div className='flex flex-row items-center justify-center p-4 bg-zinc-100 dark:bg-gray-800 gap-x-4'>
        <a
          href='https://github.com/Rllyyy'
          className='fill-zinc-800 hover:fill-zinc-600 dark:fill-zinc-200 dark:hover:fill-zinc-50'
          rel='noopener noreferrer'
          target='_blank'
          aria-label='GitHub Profile'
        >
          <Icon.GitHub />
        </a>
        <a
          className='fill-zinc-800 hover:fill-zinc-600 dark:fill-zinc-200 dark:hover:fill-zinc-50'
          href='mailto:niklas.fischer@mail.de'
          aria-label='Write E-Mail to niklas.fischer@mail.de'
        >
          <EMailIcon className='w-6 h-6 fill-inherit' height={24} width={24} />
        </a>
        <a
          href='https://stackoverflow.com/users/14602331/rllyyy'
          className='fill-zinc-800 hover:fill-zinc-600'
          rel='noopener noreferrer'
          target='_blank'
          aria-label='StackOverflow Profile'
        >
          <Icon.Stackoverflow />
        </a>
        <a
          href='https://www.linkedin.com/in/niklas-fischer-dev/'
          className='fill-zinc-800 hover:fill-zinc-600 dark:fill-zinc-200 dark:hover:fill-zinc-50'
          aria-label='LinkedIn Profile'
          rel='noopener noreferrer'
          target='_blank'
        >
          <Icon.LinkedIn />
        </a>
      </div>
    </motion.div>
  );
}
