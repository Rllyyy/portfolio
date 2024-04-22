"use client";

import Link from "next/link";
import { Card } from "./card";

export const Profile = () => {
  return (
    <section className='px-4 py-20 lg:px-6 md:py-36 bg-zinc-200 dark:bg-gray-900' id='profile'>
      <div className='grid md:grid-cols-2 w-full max-w-[1200px] mx-auto'>
        <Card />
        <div className='h-full pt-8 md:p-10'>
          <h2 className='text-4xl font-semibold md:text-5xl'>About me</h2>
          <p className='mt-8 text-lg text-gray-700 md:mt-10 dark:text-gray-400'>
            Hello, I&apos;m Niklas, a passionate front-end developer with a strong focus on creating intuitive and
            engaging user experiences.
          </p>
          <p className='mt-3 text-lg text-gray-700 md:mt-4 dark:text-gray-400'>
            I specialize in working with modern web technologies such as TypeScript, React, Tailwind and Next.js.
          </p>
          <p className='mt-3 text-lg text-gray-700 md:mt-4 dark:text-gray-400'>
            I&apos;ve delivered numerous projects, including{" "}
            <Link
              href={{ pathname: "/", hash: "projects" }}
              className='font-medium text-indigo-600 dark:text-indigo-400'
              scroll={true}
            >
              open-source initiatives
            </Link>{" "}
            and{" "}
            <Link
              href={{ pathname: "/", hash: "webinar-certificates" }}
              className='font-medium text-indigo-600 dark:text-indigo-400'
              scroll={true}
            >
              customized solutions
            </Link>{" "}
            for companies.
          </p>
          <p className='mt-3 text-lg text-gray-700 md:mt-4 dark:text-gray-400'>
            Currently, I am working as a Junior Software Engineer at Forum Energy Technologies and pursuing a degree in
            Business Economics with a specialization in Digital Transformation.
          </p>
        </div>
      </div>
    </section>
  );
};
