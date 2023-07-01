import Image from "next/image";
import assignments from "./assignments.json";
import { Variants, motion } from "framer-motion";

export const Assignments = () => {
  return (
    <section className='min-h-[75vh] px-4 lg:px-6 py-16 bg-slate-50 dark:bg-zinc-700' id='assignments'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1600px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Academic Assignments</h2>
        <motion.div
          className='grid w-full gap-4 mt-10'
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(450px, 100%), 1fr))",
          }}
          initial='hidden'
          whileInView='visible'
          variants={containerVariants}
          viewport={{ once: true, margin: "-150px" }}
        >
          {assignments.map((assignment) => {
            const { title, imageDescription, pdfFileName, text, moduleId, date } = assignment;
            return (
              <Card
                key={title}
                title={title}
                imageDescription={imageDescription}
                moduleId={moduleId}
                pdfFileName={pdfFileName}
                text={text}
                date={date}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

type TCard = (typeof assignments)[number];

const Card: React.FC<TCard> = ({ title, text, pdfFileName, imageDescription, moduleId, date }) => {
  const shortDate = getFormattedDate(date);

  return (
    <article className='flex flex-col overflow-hidden bg-white rounded-lg dark:bg-zinc-800'>
      <motion.article className='relative w-full h-64' variants={imageVariants}>
        <Image
          src={`/assignments/${moduleId}/image.png`}
          alt={imageDescription}
          className='object-cover bg-zinc-200 dark:bg-zinc-900'
          sizes='(max-width: 768px) 100vw, 450px'
          fill
        />
      </motion.article>
      <div className='flex flex-col self-stretch flex-grow p-4 border-b border-l border-r border-gray-300 rounded-b-lg dark:border-gray-900 gap-y-2'>
        <div className='flex flex-row items-center justify-between'>
          <p className='font-bold text-indigo-600 dark:text-indigo-500'>{shortDate}</p>
          <span
            className='inline px-3 py-1 text-sm font-bold leading-none rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
            aria-label='Module ID'
          >
            {moduleId}
          </span>
        </div>
        <h3 className='text-2xl font-medium text-zinc-800 dark:text-zinc-100'>{title}</h3>
        <p className='text-zinc-800 dark:text-zinc-200'>{text}</p>
        <a
          className='flex flex-row items-center gap-1 mt-auto text-xl font-semibold text-indigo-600 hover:no-underline hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-700 '
          href={`/assignments/${moduleId}/${pdfFileName}.pdf`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <span>Read</span>
          <Chevron />
        </a>
      </div>
    </article>
  );
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      duration: 0.2,
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0.2,
  },
  visible: {
    opacity: 1,
  },
};

const Chevron = () => {
  /* https://heroicons.com/ */
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={4}
      stroke='currentColor'
      className='inline-block w-5 h-5'
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
    </svg>
  );
};

/**
 * Converts a date string in the format "day.month.year" to a formatted date string.
 * @param dateString - The date string in the format "day.month.year".
 * @returns The formatted date string.
 */
function getFormattedDate(dateString: string): string {
  const [day, month, year] = dateString.split(".");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
}
