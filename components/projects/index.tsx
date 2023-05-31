import Image from "next/image";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import styles from "./test.module.css";

const projects = [
  {
    imageSrc: "/images/repeatio-question.png",
    name: "Repeatio",
    technologies: ["React", "TypeScript", "Git", "Cypress", "Markdown"],
    description:
      "A web-based application to practice for exams. With an intuitive editor, users can easily create questions and style them with markdown. The application offers a range of question types including multiple-choice, multiple-response, match, and fill-in-the-blanks. Build with shareability in mind.",
  },
  {
    imageSrc: "/images/Internet-Check.png",
    name: "Internet-Check",
    technologies: ["C#", "Git", "Markdown"],
    description:
      "A lightweight windows based application to track and record network downtime. Customize the application to your preferences, including a dark mode and custom servers. Never miss a moment of network downtime with an auto-start and notifications. The software was downloaded over 1.3 thousand times.",
  },
  {
    imageSrc: "/images/Teilnahmebescheinigung.png",
    name: "Webinar Certificates",
    technologies: ["C#", "Git"],
    description:
      "A custom software solution created for a former employer to generate and send certificates of attendance for webinars. The implementation of the program resulted in a 500% reduction in process time and the elimination of previously common errors.",
  },
];

const images: ReactImageGalleryItem[] = [
  {
    original: "/images/repeatio-question.png",
  },
  {
    original: "/images/Internet-Check.png",
  },
  {
    original: "/images/Teilnahmebescheinigung.png",
  },
];

export const Projects = () => {
  return (
    <section className='px-4 py-16 bg-slate-50 dark:bg-zinc-700' id='projects'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1200px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Projects</h2>
        <div className='w-12 h-[2px] bg-indigo-600 dark:bg-indigo-500' />
        <div className={`w-full max-w-4xl mx-auto bg-red-700  ${styles.no_tailwind}`}>
          <ImageGallery items={images} showBullets={true} />
        </div>
        <div className='space-y-6 md:space-y-12'>
          {projects.map((project, index) => {
            return (
              <article
                className='flex flex-col md:flex-row overflow-hidden shadow-lg rounded-lg md:rounded-xl min-h-[400px]'
                key={project.name}
              >
                <Image
                  src={project.imageSrc}
                  alt='Repeatio Image'
                  width={600}
                  height={400}
                  className={`object-scale-down min-h-full bg-gray-200 dark:bg-zinc-900 w-full md:w-[50%] p-2 md:p-4 ${
                    index % 2 === 0 ? "md:order-0" : "md:order-1"
                  }`}
                />
                <div className='flex flex-col p-4 md:p-6 bg-white dark:bg-zinc-800 md:w-[50%]'>
                  <h3 className='text-3xl font-semibold'>{project.name}</h3>
                  <div className='flex flex-wrap gap-2 mt-2' aria-label='Project tech stack'>
                    {project.technologies.map((technology) => {
                      return (
                        <span
                          className='px-3 py-1 text-sm font-semibold leading-none bg-indigo-600 rounded-full text-indigo-50'
                          key={`${technology}-${project.name}`}
                        >
                          {technology}
                        </span>
                      );
                    })}
                  </div>
                  <p className='my-4 text-lg'>{project.description}</p>
                  <div className='flex items-stretch mt-auto gap-x-2'>
                    <a className='p-1 text-lg font-semibold text-white bg-indigo-600 rounded-lg cursor-pointer hover:no-underline hover:bg-indigo-700 border-none w-[min(50%,_150px)] text-center uppercase duration-150 flex items-center justify-center'>
                      View
                    </a>
                    <a className='px-4 py-1 text-lg font-semibold text-indigo-600 duration-150 border border-indigo-600 rounded-lg cursor-pointer hover:no-underline hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:text-indigo-100'>
                      GitHub
                    </a>
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
