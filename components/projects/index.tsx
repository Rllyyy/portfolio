import Image from "next/image";
import { Carousel } from "./carousel";
import projects from "./projects.json";

export const Projects = () => {
  return (
    <section className='px-4 py-16 bg-zinc-50 dark:bg-zinc-900' id='projects'>
      <div className='flex flex-col items-center gap-12 w-[min(100%,_1600px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Projects</h2>
        <div className='w-12 h-[2px] bg-indigo-600 dark:bg-indigo-500' />
        <div className='space-y-6 lg:space-y-16'>
          {projects.map((project, index) => {
            return (
              <article
                className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-md lg:flex-row lg:rounded-lg lg:border-none dark:border-gray-700 lg:min-h-[650px]'
                key={project.name}
              >
                <div
                  className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 lg:w-[50%]  lg:h-[650px] h-[400px] lg:max-h-none ${
                    index % 2 !== 0 ? "lg:order-0" : "lg:order-1"
                  }`}
                >
                  <Carousel>
                    {project.carouselItems?.map((item, i) => (
                      <Image
                        key={i}
                        draggable='false'
                        src={item.resource}
                        width={650}
                        height={520}
                        alt={item.alt}
                        className='object-contain w-full max-h-full p-[1px]'
                      />
                    ))}
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
