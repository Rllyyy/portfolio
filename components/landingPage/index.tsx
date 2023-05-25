export const LandingPage = () => {
  return (
    <section className='min-h-[75vh] flex flex-col md:flex-row justify-center gap-y-20 md:gap-x-10 lg:gap-x-40 lg:p-8 p-6 py-32'>
      <div className='flex flex-col items-start justify-center w-full max-w-4xl space-y-4 md:space-y-8'>
        <h2 className='text-base md:text-xl text-zinc-700 dark:text-zinc-300'>Niklas Fischer | Portfolio </h2>
        <h1 className='text-5xl font-semibold md:text-7xl'>Developing Solutions</h1>
        <p className='text-base md:text-xl'>
          Hi, I am an aspiring <b> Web Developer </b> looking for my first real job experience :)
        </p>
        <div className='flex flex-row flex-wrap w-full gap-x-4 gap-y-2'>
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
            <span className=''>Let&apos;s Talk</span>
            {/* or Get in touch */}
          </a>
        </div>
      </div>
      <div className='flex items-center w-full max-w-2xl'>
        <div className='w-full max-w-lg py-4 px-6 border border-gray-300 dark:border-zinc-500 rounded-lg shadow-xl bg-zinc-50 md:min-h-[250px] min-h-[220px] flex flex-col text-lg dark:bg-zinc-700'>
          <p className='text-2xl md:text-3xl'>Niklas Fischer</p>
          <p className='text-base font-semibold md:text-xl text-zinc-700 dark:text-zinc-300'>Junior Web Developer</p>
          <EMail />
          <div className='space-x-2'>
            <GitHubIcon />
            <a href='https://github.com/Rllyyy'>GitHub</a>
          </div>
          <div className='space-x-2'>
            <StackoverflowIcon />
            <a href='https://stackoverflow.com/users/14602331/rllyyy'>Stackoverflow</a>
          </div>
          <div className='space-x-2'>
            <LinkedInIcon />
            <a>LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  );
};

const EMail = () => {
  return (
    <div className='mt-auto space-x-2 text-gray-400'>
      <EMailIcon />
      <a className='align-middle' href='mailto:niklas.fischer@mail.de'>
        niklas.fischer@mail.de
      </a>
    </div>
  );
};

const EMailIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='currentColor'
      className='inline-block w-5 h-5 align-middle text-inherit'
    >
      <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
      <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
    </svg>
  );
};
//width='1024' height='1024' viewBox='0 0 1024 1024'
const GitHubIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className='inline-block w-5 h-5 align-middle'
      viewBox='0 0 20 20'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
        transform='scale(1.2)'
        fill='#1B1F23'
      />
    </svg>
  );
};

const StackoverflowIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='20' height='20' className='inline-block'>
      <path d='M28.16 32H2.475V20.58H5.32v8.575h19.956V20.58h2.884z' fill='#bcbbbb' />
      <path
        d='M8.477 19.8l13.993 2.923.585-2.806-13.993-2.923zm1.832-6.704l12.94 6.04 1.208-2.572-12.94-6.08zm3.586-6.353l10.99 9.12 1.832-2.183-10.99-9.12zM20.99 0l-2.3 1.715 8.536 11.46 2.3-1.715zM8.166 26.27H22.43v-2.845H8.166v2.845z'
        fill='#f48024'
      />
    </svg>
  );
};

const LinkedInIcon = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' className='inline-flex'>
      <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' />
    </svg>
  );
};

{
  /* <svg xmlns='http://www.w3.org/2000/svg' width='32' height='30'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z'
        fill='#24292f'
      />
    </svg> */
}
