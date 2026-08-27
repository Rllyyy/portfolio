import Image from "next/image";
import { CSSProperties } from "react";
import { Carousel } from "./carousel";
import { Video } from "./video";
import projects from "./projects.json";
import styles from "./styles.module.css";

export const Projects = () => {
  return (
    <section className='px-4 py-16 lg:px-6 md:py-24 bg-zinc-50 dark:bg-dark-100 overflow-x-clip' id='projects'>
      <div className='flex flex-col items-center gap-12 md:gap-16 w-[min(100%,1600px)] m-auto'>
        <h2 className='self-start text-5xl font-bold'>Projects</h2>
        <div className='space-y-6 lg:space-y-16'>
          {projects.map((project, index) => {
            return (
              <div className={styles.trigger} key={project.name} style={{ "--stagger": index } as CSSProperties}>
                <article
                  className={`${styles.card} flex flex-col items-center overflow-clip border border-gray-300 rounded-md lg:rounded-lg lg:flex-row lg:border-none dark:border-zinc-800 lg:min-h-162.5 scroll-mt-16 md:scroll-mt-20`}
                  id={project.name.toLowerCase().replaceAll(/\s+/g, "-")} //Fails for special characters if used for url
                >
                  <div
                    className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 lg:px-0 lg:p-4 w-full lg:w-[50%]  lg:h-162.5 h-100 lg:max-h-none relative ${
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
                                className='object-contain w-full max-h-full p-px'
                              />
                            </div>
                          );
                        } else if (item.type === "video") {
                          return <Video key={i} resource={item.resource} />;
                        }
                      })}
                    </Carousel>
                  </div>
                  <div className='flex flex-col justify-center lg:w-[50%] bg-zinc-100 dark:bg-dark-200 p-6 lg:p-8 grow self-stretch '>
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
                          className='p-1 text-lg font-semibold text-white bg-indigo-600 rounded-lg cursor-pointer hover:no-underline hover:bg-indigo-700 w-[min(50%,150px)] text-center duration-150 flex items-center justify-center border border-indigo-600 hover:border-indigo-600'
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
