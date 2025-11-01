"use client";

import { Variants, motion } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CSharpIcon,
  GitHubActionsIcon,
  GitIcon,
  JavaScriptIcon,
  MarkdownIcon,
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  childVariants,
} from "./icons";
import { iconStyle, skillHeadingStyle, skillTextStyle, skillsArticleStyle, textWrapperStyle } from "./tailwind-classes";

export const Skills = () => {
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Make sure the component mounts on the client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className='px-4 py-16 lg:px-6 md:py-24 bg-zinc-100 dark:bg-dark-200' id='skills'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1600px)] m-auto'>
        <h2 className='self-start text-5xl font-bold'>Skills</h2>
        {/* Display the skills */}
        <motion.div
          className='grid w-full grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 '
          initial='hidden'
          whileInView='visible'
          variants={containerVariants}
          viewport={{ once: true, margin: "-150px" }}
        >
          {/* React */}
          <article className={`${skillsArticleStyle} rounded-t-xl md:rounded-tl-xl md:rounded-tr`}>
            <ReactIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>React.js</h3>
              <p className={skillTextStyle}>Frontend Library</p>
            </div>
          </article>
          {/* Next.js */}
          <article className={`${skillsArticleStyle} md:rounded-tr-xl lg:rounded-tr`}>
            <NextJsIcon currentTheme={currentTheme} />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Next.js</h3>
              <p className={skillTextStyle}>React.js framework for production</p>
            </div>
          </article>
          {/* C# */}
          <article className={`${skillsArticleStyle} lg:rounded-tr-xl`}>
            <CSharpIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>C# (C-Sharp)</h3>
              <p className={skillTextStyle}>Object oriented language</p>
            </div>
          </article>
          {/* TypeScript */}
          <article className={skillsArticleStyle}>
            <TypeScriptIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>TypeScript</h3>
              <p className={skillTextStyle}>Type safe JavaScript</p>
            </div>
          </article>
          {/* Cypress */}
          <article className={skillsArticleStyle}>
            <motion.div variants={childVariants}>
              <Image
                src={`/images/cypress-logo-${currentTheme}.png`}
                alt='Cypress Logo'
                className={`${iconStyle} object-scale-down`}
                width={70}
                height={70}
              />
            </motion.div>
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Cypress</h3>
              <p className={skillTextStyle}>E2E testing framework</p>
            </div>
          </article>
          {/* git */}
          <article className={skillsArticleStyle}>
            <GitIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Git</h3>
              <p className={skillTextStyle}>Version control software</p>
            </div>
          </article>
          {/* Tailwind */}
          <article className={`${skillsArticleStyle}`}>
            <TailwindcssIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Tailwind</h3>
              <p className={skillTextStyle}>CSS Framework</p>
            </div>
          </article>
          {/* Markdown */}
          <article className={skillsArticleStyle}>
            <MarkdownIcon currentTheme={currentTheme} />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Markdown</h3>
              <p className={skillTextStyle}>Markup language</p>
            </div>
          </article>
          {/* JavaScript */}
          <article className={`${skillsArticleStyle}`}>
            <JavaScriptIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>JavaScript</h3>
              <p className={skillTextStyle}>Scripting language for browsers</p>
            </div>
          </article>
          {/* GitHub Actions */}
          <article className={`${skillsArticleStyle}  lg:rounded-bl-xl`}>
            <GitHubActionsIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>GitHub Actions</h3>
              <p className={skillTextStyle}>Automating Workflows</p>
            </div>
          </article>
          {/* Zod */}
          <article className={`${skillsArticleStyle} md:rounded-bl-xl lg:rounded-bl`}>
            <motion.div variants={childVariants}>
              <Image
                // https://zod.dev/logo/logo.png
                src={`/images/zod.png`}
                alt='Zod Logo'
                className={`${iconStyle} object-scale-down`}
                width={70}
                height={70}
              />
            </motion.div>
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Zod</h3>
              <p className={skillTextStyle}>TypeScript schema validation</p>
            </div>
          </article>
          {/* Prisma */}
          <article
            className={`${skillsArticleStyle} rounded-b-xl md:rounded-bl md:rounded-br-xl lg:rounded-br-xl lg:rounded-bl`}
          >
            <PrismaIcon currentTheme={currentTheme} />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Prisma</h3>
              <p className={skillTextStyle}>Modern TypeScript ORM</p>
            </div>
          </article>
        </motion.div>
      </div>
    </section>
  );
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      duration: 0.1,
    },
  },
};
