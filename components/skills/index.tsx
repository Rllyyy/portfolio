import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Switch from "react-switch";
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
import { columnStyle, iconNameStyle, iconStyle, iconWrapperStyle } from "./tailwind-classes";

export const Skills = () => {
  const [showName, setShowName] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  // Change showName state
  const handleShowNameChange = (checked: boolean) => {
    setShowName(checked);
  };

  // Make sure the component mounts on the client
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <section className='px-4 py-16 bg-slate-200 dark:bg-zinc-700'>
      <div className='flex flex-col items-center gap-10 w-[min(100%,_800px)] m-auto'>
        <h2 className='text-4xl font-semibold'>Skills</h2>
        {/* Switch to turn on or off the name of a skill */}
        <label
          className='flex items-end px-4 py-3 border rounded-lg gap-x-4 bg-slate-100 dark:bg-zinc-800 border-slate-300 dark:border-zinc-900'
          htmlFor='switch'
          /* TODO add aria-label */
        >
          <span className='text-lg'>Display names</span>
          {/* https://github.com/markusenglund/react-switch */}
          <Switch
            checked={showName}
            onChange={handleShowNameChange}
            onColor='#4F46E5'
            onHandleColor='#fff'
            handleDiameter={26}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow='0px 1px 5px rgba(0, 0, 0, 0.6)'
            activeBoxShadow='0px 0px 1px 8px rgba(0, 0, 0, 0.2)'
            height={20}
            width={44}
            aria-label={`Switch to ${!showName ? "display" : "hide"} names of skills`}
            id='switch'
            className='z-10'
          />
        </label>
        {/* Display the skills */}
        <div className='flex flex-col w-full min-h-full space-y-4 md:flex-row md:justify-between md:space-y-0'>
          {/* Column 1 */}
          <div className={columnStyle}>
            <div className={iconWrapperStyle}>
              {/* React */}
              <ReactIcon />
              {showName && <p className={iconNameStyle}>React</p>}
            </div>
          </div>
          {/* Column 2 */}
          <div className={columnStyle}>
            {/* Nextjs */}
            <div className={iconWrapperStyle}>
              <NextJsIcon currentTheme={currentTheme} />
              {showName && <p className={iconNameStyle}>Next.js</p>}
            </div>
            {/* C# */}
            <div className={iconWrapperStyle}>
              <CSharpIcon />
              {showName && <p className={iconNameStyle}>C#</p>}
            </div>
          </div>
          {/* Column 3 */}
          <div className={columnStyle}>
            {/* TypeScript */}
            <div className={iconWrapperStyle}>
              <TypeScriptIcon />
              {showName && <p className={iconNameStyle}>TypeScript</p>}
            </div>
            {/* Cypress */}
            <div className={iconWrapperStyle}>
              {/* source: https://github.com/cypress-io/cypress/tree/develop/assets */}
              <img
                src={`images/cypress-logo-${currentTheme}.png`}
                alt='Cypress Logo'
                className={`${iconStyle} object-scale-down`}
              />
              {showName && <p className={iconNameStyle}>Cypress</p>}
            </div>
            {/* Git */}
            <div className={iconWrapperStyle}>
              <GitIcon />
              {showName && <p className={iconNameStyle}>Git</p>}
            </div>
          </div>
          {/* Column 4 */}
          <div className={columnStyle}>
            {/* Tailwind */}
            <div className={iconWrapperStyle}>
              <TailwindcssIcon />
              {showName && <p className={iconNameStyle}>Tailwind</p>}
            </div>
            {/* Markdown */}
            <div className={iconWrapperStyle}>
              <MarkdownIcon currentTheme={currentTheme} />
              {showName && <p className={iconNameStyle}>Markdown</p>}
            </div>
          </div>
          {/* Column 5 */}
          <div className={columnStyle}>
            {/* JavaScript */}
            <div className={iconWrapperStyle}>
              <JavaScriptIcon />
              {showName && <p className={iconNameStyle}>JavaScript</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
