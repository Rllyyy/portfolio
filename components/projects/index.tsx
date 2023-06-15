import Image from "next/image";
import { Carousel } from "./carousel";

const projects = [
  {
    name: "Repeatio",
    technologies: ["React", "TypeScript", "Git", "Cypress", "Markdown"],
    description:
      "A web-based application to practice for exams. With an intuitive editor, users can easily create questions and style them with markdown. The application offers a range of question types including multiple-choice, multiple-response, match, and fill-in-the-blanks. Build with shareability in mind.",
    carouselItems: [
      {
        type: "image",
        resource: "/projects/repeatio/3-mobile.png",
        alt: "Three UI mockups in phone format for learning app. The left mockup shows the module overview with three modules. The mockup in the center displays a modal with the title Edit Question and a form with which the user can edit a question. The question type Multiple-Choice is selected an the following radio options were added: Ruby, Rust, SQL, Markdown and CSS. The radio option CSS is selected. At the bottom of the form there is a button with the text Update. On the right mockup the question from the centered mockup is displayed. The title of the question is 'Which of the following is used to style web pages?'. Below the title is the points value (5) for this question if answered correctly. In cursive below the points is a text describing what the user has to do: 'Select the correct answer'. From the radio options Ruby, Rust, SQL, Markdown and CSS the user has selected CSS. Below the options there is a green box with the text: 'Yes, that's correct!'",
      },
      {
        type: "image",
        resource: "/projects/repeatio/multiple-response.png",
        alt: "UI mockup of a multiple response question with the title 'Which of the following are HTTP reponse codes?'. The following multiple response options are selected: '200 OK', '400 Bad Request', '404 Page Not found'. These options are not selected: '600 Invalid Response' and '505 Internal Server Error'.",
      },
      {
        type: "image",
        resource: "/projects/repeatio/extended-match.png",
        alt: "UI mockup of a match question in the chrome browser where the user has to correctly match items from two columns by drawing lines between them. The title of the question is 'Match the following web technologies with their description or purpose'. The items on the left side are: CSS, HTML, Git, React, Svelte and NextJs. The items on the right side are partially cut of: 'JavaScript for ...', 'A popular version co...', 'Markup language use...', 'language used for styling...' and 'Framework based on...'. The options are connected by a line: 'NextJs and Framework based on', 'Svelte and JavaScript library for', 'React and JavaScript library for', 'Git and A popular version control...'.",
      },
      {
        type: "image",
        resource: "/projects/repeatio/import-create.png",
        alt: "Two mockup of phones with a form titled Create or import a Module. On the left mockup the option 'Import Module' is selected'. The user has imported 4 modules. On the right mockup the option 'Create Module' is selected. The user is filled in the following inputs in the form. ID: RW-01. Name: Grundlagen Rechnungswesen. Language: German. Compatibility Version: 0.5.0 .",
      },
    ],
  },
  {
    name: "Internet-Check",
    technologies: ["C#", "Git", "Markdown"],
    description:
      "A lightweight windows based application to track and record network downtime. Customize the application to your preferences, including a dark mode and custom servers. Never miss a moment of network downtime with an auto-start and notifications. The software was downloaded over 1.3 thousand times.",
    carouselItems: [
      {
        type: "image",
        resource: "/projects/Internet-Check/main.png",
        alt: "Mockup of software recording internet downtime. The program has a simple UI in white at the top and black at the bottom with white taking up most of the interface. The main form is made up of 4 buttons: Start, Open, Clear and Settings. At the bottom there are two elements: Interval (sec): 30 and Waiting... .",
      },
      {
        type: "image",
        resource: "/projects/Internet-Check/settings.png",
        alt: "Mockup of settings page.",
      },
      {
        type: "image",
        resource: "/projects/Internet-Check/results.png",
        alt: "Mockup of windows notepad showing internet outage with a timestamp.",
      },
      {
        type: "image",
        resource: "/projects/Internet-Check/toast.png",
        alt: "Toast showing 'Connection lost'",
      },
    ],
  },
  {
    name: "Webinar Certificates",
    technologies: ["C#", "Git"],
    description:
      "A custom software solution created for a former employer to generate and send certificates of attendance for webinars. The implementation of the program resulted in a 500% reduction in process time and the elimination of previously common errors.",
    carouselItems: [
      {
        type: "image",
        resource: "/projects/Webinar-Certificates/certificate.png",
        alt: "Mockup of a webinar certificate.",
      },
      {
        type: "image",
        resource: "/projects/Webinar-Certificates/main.png",
        alt: "Mockup of software used to create webinar certificates.",
      },
    ],
  },
];

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
