import { EMailIcon } from "components/icons/email";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Profile = () => {
  return (
    <section className='px-4 py-20 lg:px-6 md:py-36 bg-zinc-200 dark:bg-gray-900' id='profile'>
      <motion.div
        className='grid md:grid-cols-2 w-full max-w-[1200px] mx-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className='flex flex-col justify-between h-full overflow-hidden rounded-lg shadow-xl '>
          <div className='flex flex-col items-center h-full p-8 bg-gray-300 md:p-12 dark:bg-gray-700 gap-y-6'>
            <div className='relative w-40 h-40 overflow-hidden rounded-full md:w-48 md:h-48'>
              <Image
                src='/images/profile-image.png'
                alt='Profile Picture'
                fill
                className='object-contain rounded-1/2'
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
              <GitHubIcon />
            </a>
            <a
              className='fill-zinc-800 hover:fill-zinc-600 dark:fill-zinc-200 dark:hover:fill-zinc-50'
              href='mailto:niklas.fischer@mail.de'
              aria-label='Write E-Mail to niklas.fischer@mail.de'
            >
              <EMailIcon className='w-6 h-6 fill-inherit' />
            </a>
            <a
              href='https://stackoverflow.com/users/14602331/rllyyy'
              className='fill-zinc-800 hover:fill-zinc-600'
              rel='noopener noreferrer'
              target='_blank'
              aria-label='StackOverflow Profile'
            >
              <StackoverflowIcon />
            </a>
            <a
              href='https://www.linkedin.com/in/niklas-fischer-dev/'
              className='fill-zinc-800 hover:fill-zinc-600 dark:fill-zinc-200 dark:hover:fill-zinc-50'
              aria-label='LinkedIn Profile'
              rel='noopener noreferrer'
              target='_blank'
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
        <div className='h-full pt-8 md:p-10'>
          <h2 className='text-4xl font-semibold md:text-5xl'>About me</h2>
          <p className='mt-4 text-lg text-gray-600 md:mt-6 dark:text-gray-400'>
            Hello, I&apos;m Niklas, a passionate front-end developer with a strong focus on creating intuitive and
            engaging user experiences.
          </p>
          <p className='mt-3 text-lg text-gray-600 md:mt-4 dark:text-gray-400'>
            I specialize in working with modern web technologies such as TypeScript, React, Tailwind and Next.js.
          </p>
          <p className='mt-3 text-lg text-gray-600 md:mt-4 dark:text-gray-400'>
            I&apos;ve delivered numerous projects, including{" "}
            <Link
              href={{ pathname: "/", hash: "projects" }}
              className='font-medium text-indigo-600 dark:text-indigo-400'
              scroll={false}
            >
              open-source initiatives
            </Link>{" "}
            and{" "}
            <Link
              href={{ pathname: "/", hash: "webinar-certificates" }}
              className='font-medium text-indigo-600 dark:text-indigo-400'
              scroll={false}
            >
              customized solutions
            </Link>{" "}
            for companies.
          </p>
          <p className='mt-3 text-lg text-gray-600 md:mt-4 dark:text-gray-400'>
            Currently, I am pursuing a degree in business economics with a specialization in digital transformation.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

const GitHubIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className='inline-block w-6 h-6 align-middle text-inherit fill-inherit'
      viewBox='0 0 20 20'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        className='fill-inherit'
        d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
        transform='scale(1.2)'
        /* fill='#1B1F23' */
        /* fill='#F4F4F5' */
      />
    </svg>
  );
};

const StackoverflowIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' className='inline-block w-6 h-6'>
      <path d='M28.16 32H2.475V20.58H5.32v8.575h19.956V20.58h2.884z' fill='#bcbbbb' /* fill='#F4F4F5' */ />
      <path
        d='M8.477 19.8l13.993 2.923.585-2.806-13.993-2.923zm1.832-6.704l12.94 6.04 1.208-2.572-12.94-6.08zm3.586-6.353l10.99 9.12 1.832-2.183-10.99-9.12zM20.99 0l-2.3 1.715 8.536 11.46 2.3-1.715zM8.166 26.27H22.43v-2.845H8.166v2.845z'
        fill='#f48024'
      />
    </svg>
  );
};

const LinkedInIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      className='inline-flex w-6 h-6 text-inherit fill-inherit'
      fill='inherit'
    >
      <path
        d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
        /*   fill='#F4F4F5' */
        fill='inherit'
      />
    </svg>
  );
};
