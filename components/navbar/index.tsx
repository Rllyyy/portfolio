import { useState, useEffect, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BurgerIcon, ThemeSwitchIcon, XMarkIcon } from "./icons";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [showNav, setShowNav] = useState(typeof window !== "undefined" && window.innerWidth >= 768); // Initially display the navbar if the window rendered and is wider than 768 pixel
  const isTop = useScrollYPosition();

  // Get current theme to be either system or dark/light if the user clicked on the theme switcher (and saved the state to local storage)
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Update the theme
  const handleThemeSwitch = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  // Update the display of the menu items on mobile
  const handleNavClick = () => {
    setShowNav((prevShowNav) => !prevShowNav);
  };

  // Minimize the navbar on mobile if clicking on a menuitem
  const handleNavbarCloseMobile = () => {
    // Return if the user is not using mobile viewport
    if (window.innerWidth >= 768) return;

    // Update the state
    setShowNav(false);
  };

  // Always show the menu items on desktop
  // Fixes an issue where the menu items are no longer visible after
  // the user closed the expanded menu on mobile and resized the window to desktop
  useEffect(() => {
    const handleResize = () => {
      setShowNav(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full duration-200 ${
        isTop
          ? "bg-zinc-100 dark:bg-zinc-800 "
          : "bg-zinc-50 dark:bg-zinc-900 border-b-zinc-300 dark:border-b-zinc-900 border-b dark:border-none"
      }`}
    >
      <div
        className={`flex items-center justify-between w-full px-4 lg:px-6 mx-auto max-w-screen-4xl duration-200 ${
          isTop ? "py-8 md:py-16" : "py-3"
        }`}
      >
        <Link href={{ pathname: "/" }} className='hover:no-underline'>
          <h1 className='text-xl font-semibold '>Niklas Fischer</h1>
        </Link>
        {/* Trying to use the same list for the mobile and desktop version for the menu items. Might delete this if mobile gets special fade-in animation */}
        <ul
          className={`flex flex-col md:flex-row gap-y-2 md:gap-y-0 gap-x-6 text-lg md:relative top-full md:w-auto w-full left-0 right-0 px-6 py-2 md:p-0 text-center duration-200 ${
            showNav ? "absolute" : "hidden"
          } border-b-[1px] md:border-b-0 border-b-zinc-300 dark:border-b-zinc-900 ${
            isTop ? "bg-zinc-100 dark:bg-zinc-800" : "bg-zinc-50 dark:bg-zinc-900 "
          }`}
        >
          <li>
            <a href='#top' className='hover:no-underline' onClick={handleNavbarCloseMobile}>
              Home
            </a>
          </li>
          <li>
            <a href='#projects' className='hover:no-underline' onClick={handleNavbarCloseMobile}>
              Projects
            </a>
          </li>
          <li>
            <a href='#skills' className='hover:no-underline' onClick={handleNavbarCloseMobile}>
              Skills
            </a>
          </li>
          <li>
            <span>Contact</span>
          </li>
        </ul>
        <div className='flex flex-row items-center gap-x-4'>
          <button
            className='cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-[background] p-1'
            onClick={handleThemeSwitch}
            aria-label={currentTheme === "light" ? "Use dark mode" : "Use light mode"}
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
      </div>
    </nav>
  );
}

function subscribe(onStoreChange: () => void) {
  global.window?.addEventListener("scroll", onStoreChange);
  return () => global.window?.removeEventListener("scroll", onStoreChange);
}

function useScrollYPosition() {
  return useSyncExternalStore(
    subscribe,
    () => global.window?.scrollY === 0,
    () => undefined
  );
}
