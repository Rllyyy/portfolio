import Image from "next/image";
import { Carousel } from "./carousel";

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

const items = [
  {
    type: "image",
    resource: "/images/repeatio-question.png",
    alt: "Multiple Response Question",
  },
  {
    type: "image",
    resource: "/images/Teilnahmebescheinigung.png",
    alt: "Interface for software",
  },
  {
    type: "image",
    resource: "/images/Internet-Check.png",
    alt: "Simple UI for software reading Start",
  },
];

export const Projects = () => {
  return (
    <section className='px-4 py-16 bg-zinc-50 dark:bg-zinc-900' id='projects'>
      <div className='flex flex-col items-center gap-12 w-[min(100%,_1600px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Projects</h2>
        <div className='w-12 h-[2px] bg-indigo-600 dark:bg-indigo-500' />
        <div className='space-y-8 md:space-y-16'>
          {projects.map((project, index) => {
            return (
              <article
                className='flex flex-col items-center overflow-hidden border border-gray-300 rounded-md md:flex-row md:rounded-lg md:border-none dark:border-gray-700 min-h-[600px]'
                key={project.name}
              >
                <div
                  className={`grid grid-cols-[max-content_1fr_max-content] grid-rows-[1fr_max-content] place-items-center gap-1 pt-4 pb-2 md:p-6 md:w-[50%] md:h-[450px]  ${
                    index % 2 !== 0 ? "md:order-0" : "md:order-1"
                  }`}
                >
                  <Carousel>
                    {items.map((item, i) => (
                      <Image
                        key={i}
                        draggable='false'
                        src={item.resource}
                        width={650}
                        height={400}
                        alt={item.alt}
                        className='object-scale-down w-full max-h-full p-[1px]'
                      />
                    ))}
                  </Carousel>
                </div>
                <div className='flex flex-col justify-center md:w-[50%] bg-zinc-100 dark:bg-zinc-800 p-6 md:p-8 flex-grow self-stretch '>
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
