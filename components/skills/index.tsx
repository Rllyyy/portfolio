import { Variants, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CSharpIcon,
  GitIcon,
  JavaScriptIcon,
  MarkdownIcon,
  NextJsIcon,
  ReactIcon,
  TailwindcssIcon,
  TypeScriptIcon,
  childVariants,
} from "./icons";
import { iconStyle, skillHeadingStyle, skillTextStyle, skillsArticleStyle, textWrapperStyle } from "./tailwind-classes";
import { ThickUnderline } from "components/icons/underline";

export const Skills = () => {
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Make sure the component mounts on the client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className='px-4 py-16 lg:px-6 md:py-24 bg-zinc-100 dark:bg-zinc-800' id='skills'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1600px)] m-auto'>
        <div className='flex flex-col items-start w-full md:items-center gap-y-4'>
          <h2 className='relative text-5xl font-semibold'>
            Skills
            <ThickUnderline />
          </h2>
        </div>
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
          <article className={`${skillsArticleStyle} lg:rounded-bl-xl`}>
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
          <article
            className={`${skillsArticleStyle} rounded-b-xl md:rounded-bl-xl md:rounded-br lg:rounded-br-xl lg:rounded-bl`}
          >
            <JavaScriptIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>JavaScript</h3>
              <p className={skillTextStyle}>Scripting language for browsers</p>
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
