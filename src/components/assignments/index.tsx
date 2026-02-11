import { AssignmentsSchema } from "@schemas";
import { transformURI } from "@utils/transformURI";
import { getFormattedDate } from "@utils/formatDate";
import * as motion from "motion/react-client";
import Image from "next/image";
import { TAssignment } from "@types";
import { Variants } from "motion/dist/react";
import { MotionComponent } from "./MotionLink";
import { Icon } from "@components/icons";

async function getAssignments() {
  const { default: assignments } = await import("public/assignments.json");
  return AssignmentsSchema.parse(assignments);
}

export const Assignments = async () => {
  const assignments = await getAssignments();

  return (
    <section className='min-h-[75vh] px-4 lg:px-6 py-16 md:py-24 bg-slate-50 dark:bg-dark-100' id='assignments'>
      <div className='flex flex-col items-center gap-8 md:gap-12 w-[min(100%,1600px)] m-auto'>
        <h2 className='self-start text-5xl font-bold'>Academic Assignments</h2>
        <motion.div
          className='grid w-full gap-4'
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(450px, 100%), 1fr))",
          }}
          initial='hidden'
          whileInView='visible'
          variants={containerVariants}
          viewport={{ once: true, margin: "-150px" }}
        >
          {assignments.map((assignment) => {
            const { title, imageDescription, text, moduleId, date } = assignment;
            return (
              <Card
                key={title}
                title={title}
                imageDescription={imageDescription}
                moduleId={moduleId}
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

const Card: React.FC<TAssignment> = ({ title, text, imageDescription, moduleId, date }) => {
  const machineDate = getFormattedDate(date, "en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const shortDate = getFormattedDate(date, "en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className='flex flex-col overflow-hidden bg-white border border-gray-300 rounded-lg dark:bg-dark-200 dark:border-zinc-800'
      id={`assignment-${moduleId}`}
    >
      <div className='relative w-full h-64'>
        <Image
          src={`/assignments/${moduleId}/image.png`}
          alt={imageDescription}
          className='object-cover bg-zinc-200 dark:bg-dark-100'
          sizes='(max-width: 768px) 100vw, (max-width: 1446px) 50vw, 33vw'
          fill
        />
      </div>
      <div className='flex flex-col self-stretch grow p-5 gap-y-2'>
        <div className='flex flex-row items-center justify-between'>
          <time dateTime={machineDate} className='font-bold text-indigo-600 dark:text-gray-400'>
            {shortDate}
          </time>
          <span
            className='inline px-3 py-1 text-sm font-bold leading-none rounded-full bg-zinc-200 dark:bg-gray-700 text-zinc-600 dark:text-zinc-300'
            aria-label='Module ID'
          >
            {moduleId}
          </span>
        </div>
        <h3 className='text-xl font-medium text-zinc-800 dark:text-zinc-100'>{title}</h3>
        <p className='text-zinc-800 dark:text-zinc-200'>{text}</p>
        <MotionComponent
          className='flex flex-row items-center gap-1 mt-auto text-lg font-semibold text-indigo-600 hover:no-underline dark:text-indigo-500'
          href={`/assignments/${moduleId}/${transformURI(title)}`}
          whileHover={{ gap: "8px", transition: { duration: 0.1 } }}
        >
          <span>Read</span>
          <Icon.Chevron />
        </MotionComponent>
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
