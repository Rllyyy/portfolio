import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BurgerIcon, ThemeSwitchIcon, XMarkIcon } from "./icons";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [showNav, setShowNav] = useState(false);

  // Get current theme to be either system or dark/light if the user clicked on the theme switcher (and saved the state to local storage)
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Update the theme
  const handleThemeSwitch = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Update the display of the menu items on mobile
  const handleNavClick = () => {
    setShowNav(!showNav);
  };

  // Always show the menu items on desktop
  // Fixes an issue where the menu items are no longer visible after
  // the user closed the expanded menu on mobile and resized the window to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav className='sticky top-0 left-0 right-0 flex items-center justify-between w-full max-w-full p-2 md:px-4 md:py-3 duration-200 border-b-zinc-300 dark:border-b-zinc-900 border-b-[1px] bg-zinc-50 dark:bg-zinc-900'>
      <Link href={{ pathname: "/" }}>
        <h1 className='text-xl font-semibold md:text-2xl'>Niklas Fischer</h1>
      </Link>
      {/* Trying to use the same list for the mobile and desktop version for the menu items. Might delete this if mobile gets special fade-in animation */}
      <ul
        className={`flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-6 text-lg md:relative top-full bg-zinc-50 dark:bg-zinc-900 md:bg-transparent md:dark:bg-transparent md:w-auto w-full left-0 right-0 px-6 py-2 md:p-0 text-center ${
          showNav ? "absolute" : "hidden"
        } border-b-[1px] md:border-b-0 border-b-zinc-300 dark:border-b-zinc-900`}
      >
        <li>
          <span>Home</span>
        </li>
        <li>
          <span>Projects</span>
        </li>
        <li>
          <span>Skills</span>
        </li>
        <li>
          <span>Contact</span>
        </li>
      </ul>
      <div className='flex flex-row items-center gap-x-4'>
        <button
          className='cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800  rounded-lg hover:text-orange-600 transition-[background] p-1'
          onClick={handleThemeSwitch}
          aria-label={theme === "light" ? "Use dark mode" : "Use light mode"}
        >
          <ThemeSwitchIcon currentTheme={currentTheme} className='w-6 h-6 ' />
        </button>
        <button
          onClick={handleNavClick}
          className='md:hidden'
          aria-label={!showNav ? "Show navigation" : "Hide navigation"}
        >
          {!showNav ? <BurgerIcon /> : <XMarkIcon />}
        </button>
      </div>
    </nav>
  );
}
