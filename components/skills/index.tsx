import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import {
  ReactIcon,
  NextJsIcon,
  CSharpIcon,
  TypeScriptIcon,
  GitIcon,
  TailwindcssIcon,
  MarkdownIcon,
  JavaScriptIcon,
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
    <section className='px-4 py-16 lg:px-6 bg-zinc-100 dark:bg-zinc-800' id='skills'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_1600px)] m-auto'>
        <h2 className='text-5xl font-semibold'>Skills</h2>
        {/* Display the skills */}
        <div className='grid w-full grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 '>
          {/* React */}
          <article className={`${skillsArticleStyle} rounded-t-xl md:rounded-tl-xl md:rounded-tr`}>
            <ReactIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>React.js</h3>
              <p className={skillTextStyle}>Frontend Library</p>
            </div>
          </article>
          <article className={`${skillsArticleStyle} md:rounded-tr-xl lg:rounded-tr`}>
            <NextJsIcon currentTheme={currentTheme} />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Next.js</h3>
              <p className={skillTextStyle}>React.js framework for production</p>
            </div>
          </article>
          <article className={`${skillsArticleStyle} lg:rounded-tr-xl`}>
            <CSharpIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>C# (C-Sharp)</h3>
              <p className={skillTextStyle}>Object oriented language</p>
            </div>
          </article>
          <article className={skillsArticleStyle}>
            <TypeScriptIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>TypeScript</h3>
              <p className={skillTextStyle}>Type safe JavaScript</p>
            </div>
          </article>
          <article className={skillsArticleStyle}>
            <Image
              src={`/images/cypress-logo-${currentTheme}.png`}
              alt='Cypress Logo'
              className={`${iconStyle} object-scale-down`}
              width={70}
              height={70}
            />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Cypress</h3>
              <p className={skillTextStyle}>E2E testing framework</p>
            </div>
          </article>
          <article className={skillsArticleStyle}>
            <GitIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Git</h3>
              <p className={skillTextStyle}>Version control software</p>
            </div>
          </article>
          <article className={`${skillsArticleStyle} lg:rounded-bl-xl`}>
            <TailwindcssIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Tailwind</h3>
              <p className={skillTextStyle}>CSS Framework</p>
            </div>
          </article>
          <article className={skillsArticleStyle}>
            <MarkdownIcon currentTheme={currentTheme} />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>Markdown</h3>
              <p className={skillTextStyle}>Markup language</p>
            </div>
          </article>
          <article
            className={`${skillsArticleStyle} rounded-b-xl md:rounded-bl-xl md:rounded-br lg:rounded-br-xl lg:rounded-bl`}
          >
            <JavaScriptIcon />
            <div className={textWrapperStyle}>
              <h3 className={skillHeadingStyle}>JavaScript</h3>
              <p className={skillTextStyle}>Scripting language for browsers</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
