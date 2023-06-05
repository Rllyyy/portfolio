import Image from "next/image";

const assignments = [
  {
    title: "Big Data und Prozessmanagement im Unternehmenseinsatz",
    text: "Lange Zeit blieben digitale Datenmassen ungenutzt. Wie können Unternehmen Big Data im Geschäftsprozessmanagement nutzen, um daraus Chancen und Erkenntnisse zu gewinnen? Im Fokus dieser Arbeit steht zudem die Beantwortung der Frage, welche Herausforderungen und Risiken mit Big Data verbunden sind.",
    moduleId: "ANS43",
    pdfFileName: "Big_Data_und_Prozessmanagement_im_Unternehmenseinsatz",
    imageDescription: "",
    date: "14.11.2021",
  },
  {
    title: "Blockchain - eine erfolgreiche Technologie auch außerhalb des FinTech-Sektors?",
    text: "Blockchain war zweifellos das Buzzword des letzten Jahrzehnts, aber wie sieht es tatsächlich in der Praxis aus? In dieser Arbeit werden mögliche Anwendungen untersucht, erfolgreiche Beispiele vorgestellt und potenzielle Gefahren für Nutzer und Unternehmen aufgezeigt.",
    moduleId: "DIT61",
    pdfFileName: "Blockchain_-_eine_erfolgreiche_Technologie_auch_außerhalb_des_FinTech-Sektors",
    imageDescription: "",
    date: "01.05.2023",
  },
  {
    title: "Datenmanagement",
    text: "Datenmanagement, Datensicherung und Archivierung sind essentielle Aspekte in der heutigen Informationsgesellschaft. In dieser Arbeit werden Nutzen und Aufwand dieses Prozesses diskutiert. Zudem werden die Vor- und Nachteile verschiedener Datensicherungsmedien für die Langzeitarchivierung untersucht und anhand einer fiktiven Fallstudie ein Datenmanagement- und Archivierungskonzept entwickelt.",
    moduleId: "IMG40",
    pdfFileName: "Datenmanagement",
    imageDescription: "",
    date: "24.03.2021",
  },
  {
    title: "Herausforderungen der Personalentwicklung im Zeitalter der Digitalisierung",
    text: "Die Digitalisierung bringt einen tiefgreifenden Wandel mit sich, der nicht nur Unternehmen, sondern auch die Personalentwicklung vor neue Herausforderungen stellt. In dieser Arbeit wird einen Blick auf die wachsende Bedeutung der Personalentwicklung geworfen und die mögliche Herausforderungen reflektiert.",
    moduleId: "PER25",
    pdfFileName: "Herausforderungen_der_Personalentwicklung_im_Zeitalter_der_Digitalisierung",
    imageDescription: "",
    date: "31.12.2019",
  },
  {
    title: "Personalführung im digitalen Zeitalter: Merkmale und Bedeutung der Ambidextrie",
    text: "In Zeiten der Digitalisierung stellen sich Unternehmen die Frage, wie sie sich profitabel und zukunftsorientiert positionieren können. Gleichzeitig rücken die Mitarbeiter als wichtigste Ressource eines Unternehmens in den Fokus. Wie lässt sich des Konzepts Ambidextrie eine Balance zwischen Stabilität und Innovation finden?",
    moduleId: "PER26",
    pdfFileName: "Personalführung_im_digitalen_Zeitalter_Merkmale_und_Bedeutung_der_Ambidextrie",
    imageDescription: "",
    date: "01.02.2021",
  },
  {
    title: "Wissensmanagement",
    text: "In einer überfluteten Informationslandschaft gewinnt der bewusste Umgang mit Wissen immer mehr an Bedeutung für Unternehmen. Um im Wettbewerb zu bestehen, müssen sie ihr Wissenspotenzial systematisch erschließen und eine ganzheitliche Wissenskultur etablieren. In drei Fallstudien wird aufgezeigt, wie erfolgreiches Wissensmanagement in der Praxis umgesetzt werden kann.",
    moduleId: "PEW62",
    pdfFileName: "Wissensmanagement",
    imageDescription: "",
    date: "26.02.2023",
  },
  {
    title: "Bedeutung und Methoden der Visualisierung von Inhalten in einer Präsentation",
    text: "Eine überzeugende Visualisierung von Inhalten spielt in Präsentationen eine entscheidende Rolle, um Informationen effektiv zu vermitteln. In dieser Arbeit werden die Bedeutung der Visualisierung von Inhalten untersucht und verschiedene Methoden vorstellt, um Präsentationen visuell ansprechend und wirkungsvoll zu gestalten.",
    moduleId: "SQF20",
    pdfFileName: "Visualisierung_in_einer_Praesentation",
    imageDescription: "",
    date: "21.03.2019",
  },
  {
    title: "SWOT-Analyse",
    text: "In einer sich ständig verändernden Geschäftswelt stehen Unternehmen vor immer neuen Herausforderungen. Die SWOT-Analyse hat sich dabei als ein wertvolles Instrument zur Strukturierung und Formulierung strategischer Entscheidungen etabliert. Wie sie zur Steigerung der Wettbewerbsfähigkeit und zur Erreichung der Unternehmensziele beiträgt, wird anhand einer fiktiven Fallstudie erläutert.",
    moduleId: "UFU50",
    pdfFileName: "SWOT-Analyse",
    image: "/assignments/UFU50/image.png",
    imageDescription: "",
    date: "15.12.2022",
  },
  {
    title: "Digitalisierung und Geschäftsmodell-Innovation",
    text: "Die Digitalisierung hat die Geschäftswelt revolutioniert und erfordert von Unternehmen eine kontinuierliche Anpassung und Innovation ihrer Geschäftsmodelle, um im Wettbewerb erfolgreich zu sein. In dieser Arbeit werden die Bedeutung der Geschäftsmodell-Innovation im Zeitalter der Digitalisierung untersucht und erfolgreiche Strategien zur Transformation von Unternehmen betrachtet.",
    moduleId: "DIT41",
    pdfFileName: "Digitalisierung_und_Geschaeftsmodell-Innovation",
    image: "/assignments/DIT41/image.png",
    imageDescription: "",
    date: "26.06.2022",
  },
];

export const Assignments = () => {
  return (
    <section className='min-h-[75vh] px-4 py-16 bg-slate-50 dark:bg-zinc-700' id='assignments'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1600px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Academic Assignments</h2>
        <div
          className='grid w-full gap-4 mt-10'
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(450px, 100%), 1fr))",
          }}
        >
          {assignments.map((assignment) => {
            const { title, image, imageDescription, pdfFileName, text, moduleId, date } = assignment;
            return (
              <Card
                key={title}
                title={title}
                image={image}
                imageDescription={imageDescription}
                moduleId={moduleId}
                pdfFileName={pdfFileName}
                text={text}
                date={date}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

function getFormattedDate(dateString: string): string {
  const [day, month, year] = dateString.split(".");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  });

  return formatter.format(date);
}

type TCard = (typeof assignments)[number];

const Card: React.FC<TCard> = ({ title, text, pdfFileName, image, imageDescription, moduleId, date }) => {
  const shortDate = getFormattedDate(date);

  return (
    <article className='flex flex-col overflow-hidden bg-white rounded-lg dark:bg-zinc-800'>
      <Image
        src={`/assignments/${moduleId}/image.png`}
        alt={imageDescription}
        className='object-cover w-full h-64 bg-slate-300'
        width={900}
        height={256}
      />
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
        <h3 className='text-2xl font-semibold text-zinc-800 dark:text-zinc-100'>{title}</h3>
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
