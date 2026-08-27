import { CSSProperties, FC } from "react";
import {
  CSharpIcon,
  CypressIcon,
  GitHubActionsIcon,
  GitIcon,
  JavaScriptIcon,
  MarkdownIcon,
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  ZodIcon,
} from "./icons";
import styles from "./styles.module.css";
import { skillHeadingStyle, skillTextStyle, skillsArticleStyle, textWrapperStyle } from "./tailwind-classes";

interface ISkill {
  name: string;
  description: string;
  Icon: FC;
  corners?: string;
}

const skills: ISkill[] = [
  {
    name: "React.js",
    description: "Frontend Library",
    Icon: ReactIcon,
    corners: "rounded-t-xl md:rounded-tl-xl md:rounded-tr",
  },
  {
    name: "Next.js",
    description: "React.js framework for production",
    Icon: NextJsIcon,
    corners: "md:rounded-tr-xl lg:rounded-tr",
  },
  {
    name: "C# (C-Sharp)",
    description: "Object oriented language",
    Icon: CSharpIcon,
    corners: "lg:rounded-tr-xl",
  },
  { name: "TypeScript", description: "Type safe JavaScript", Icon: TypeScriptIcon },
  { name: "Cypress", description: "E2E testing framework", Icon: CypressIcon },
  { name: "Git", description: "Version control software", Icon: GitIcon },
  { name: "Tailwind", description: "CSS Framework", Icon: TailwindcssIcon },
  { name: "Markdown", description: "Markup language", Icon: MarkdownIcon },
  { name: "JavaScript", description: "Scripting language for browsers", Icon: JavaScriptIcon },
  {
    name: "GitHub Actions",
    description: "Automating Workflows",
    Icon: GitHubActionsIcon,
    corners: "lg:rounded-bl-xl",
  },
  {
    name: "Zod",
    description: "TypeScript schema validation",
    Icon: ZodIcon,
    corners: "md:rounded-bl-xl lg:rounded-bl",
  },
  {
    name: "Prisma",
    description: "Modern TypeScript ORM",
    Icon: PrismaIcon,
    corners: "rounded-b-xl md:rounded-bl md:rounded-br-xl lg:rounded-br-xl lg:rounded-bl",
  },
];

export const Skills = () => {
  return (
    <section className='px-4 py-16 lg:px-6 md:py-24 bg-zinc-100 dark:bg-dark-200' id='skills'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,1600px)] m-auto'>
        <h2 className='self-start text-5xl font-bold'>Skills</h2>
        <div className={`${styles.trigger} grid w-full grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3`}>
          {skills.map(({ name, description, Icon, corners }, index) => (
            <article
              className={`${styles.skill} ${skillsArticleStyle} ${corners ?? ""}`}
              key={name}
              style={{ "--stagger": index } as CSSProperties}
            >
              <Icon />
              <div className={textWrapperStyle}>
                <h3 className={skillHeadingStyle}>{name}</h3>
                <p className={skillTextStyle}>{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
