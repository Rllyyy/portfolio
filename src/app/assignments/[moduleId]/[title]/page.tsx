import Image from "next/image";
import { getFormattedDate } from "@utils/formatDate";
import { Icon } from "@components/icons";
import { transformURI } from "@utils/transformURI";
import { AssignmentsSchema } from "@schemas";
import type { TAssignment } from "@types";

export const dynamicParams = false;

export default async function Page({ params }: { params: Promise<Pick<TAssignment, "moduleId">> }) {
  const { moduleId } = await params;

  const { default: data } = await import(`public/assignments/${moduleId}/raw.htm`);

  if (!data) {
    throw new Error("No data found");
  }

  const { default: assignments } = await import("public/assignments.json");
  const validAssignments = AssignmentsSchema.parse(assignments);

  const assignment = validAssignments.find((assignment) => assignment.moduleId === moduleId);

  if (!assignment) {
    throw new Error("No assignment found");
  }

  const machineDate = getFormattedDate(assignment.date, "en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const shortDate = getFormattedDate(assignment.date, "de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <main className='px-3 space-y-2 mt-28 md:mt-40'>
      <div className='max-w-2xl mx-auto prose dark:prose-invert'>
        <h1 className='font-serif hyphens-auto text-balance' lang='de'>
          {assignment.title}
        </h1>
        <p className='mt-2 mb-4 font-serif text-lg font-light leading-relaxed text-gray-700 md:text-xl dark:text-gray-300'>
          {assignment.text}
        </p>
        <hr className='h-px my-6 bg-gray-300 border-0 dark:bg-gray-700' />
        <div className='flex items-center justify-between mb-4'>
          <time dateTime={machineDate} className='text-sm text-slate-600 dark:text-gray-400'>
            {shortDate}
          </time>
          <a
            className='px-2 py-1.5 no-underline rounded-sm hover:no-underline hover:bg-gray-200 transition-[background] text-sm text-slate-600 dark:text-gray-400 font-normal flex flex-row gap-1'
            href={`/assignments/${moduleId}/${assignment.pdfFileName}.pdf`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon.PDF />
            <span>View PDF</span>
          </a>
        </div>
      </div>

      <div className='relative w-full max-w-full md:max-w-3xl xl:max-w-5xl mx-auto h-56 sm:h-80 md:h-[400px] xl:h-[600px] '>
        <Image
          src={`/assignments/${moduleId}/image.png`}
          priority
          alt={assignment.imageDescription}
          className='object-cover '
          sizes='(max-width: 1200px) 50vw, 100vw'
          fill
        />
      </div>

      <div>
        <div
          dangerouslySetInnerHTML={{ __html: data }}
          lang='de'
          className='mx-auto prose prose-a:no-underline hover:prose-a:no-underline prose-a:scroll-mt-16 prose-a:text-gray-700 prose-tr:border-slate-300 scroll-mt-20 prose-a:font-normal prose-td:text-base prose-h5:font-semibold dark:prose-invert dark:prose-a:text-gray-200 dark:prose-tr:border-slate-700 prose-li:list-outside marker:text-gray-400 prose-img:block prose-img:mx-auto prose-a:break-all prose-headings:hyphens-auto prose-headings:break-normal'
        />
      </div>
    </main>
  );
}

export async function generateStaticParams(): Promise<Pick<TAssignment, "moduleId">[]> {
  const { default: assignments } = await import("public/assignments.json");
  const validAssignments = AssignmentsSchema.parse(assignments);

  return validAssignments.map((assignment) => ({
    moduleId: assignment.moduleId,
    title: transformURI(assignment.title),
  }));
}
