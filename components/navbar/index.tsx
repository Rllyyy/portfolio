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
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full md:h-auto duration-200 ${
        showNav ? "h-[100dvh]" : ""
      } ${
        isTop ? "bg-zinc-100 dark:bg-zinc-800" : "bg-zinc-50 dark:bg-black border-b-zinc-300 border-b dark:border-none"
      }`}
    >
      <div
        className={`grid content-center w-full grid-cols-[1fr_max-content] px-4 lg:px-6 mx-auto max-w-screen-4xl duration-200 md:grid-cols-[max-content_1fr_max-content] grid-rows-[max-content_1fr] md:grid-rows-[auto] h-full md:h-auto md:gap-x-24 ${
          isTop ? "py-8 md:py-16" : "py-2"
        }`}
      >
        <Link href={{ pathname: "/" }} className='self-center hover:no-underline'>
          <h1 className='text-xl font-semibold text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-zinc-100'>
            Niklas Fischer
          </h1>
        </Link>
        <ul
          className={`flex flex-col md:flex-row gap-y-[5%] md:gap-y-0 gap-x-6 text-lg md:relative  md:w-auto w-full px-6 py-2 md:p-0 text-center duration-200 justify-center order-3 md:order-2 col-span-2 md:col-span-1 overscroll-none md:ml-auto ${
            showNav ? "" : "hidden"
          } ${isTop ? "bg-zinc-100 dark:bg-zinc-800" : "bg-zinc-50 dark:bg-black "}`}
        >
          <li className='flex justify-center'>
            {/* smooth scrolling doesn't work: https://github.com/vercel/next.js/issues/44295 */}
            {/* <a href='/#top' className='text-xl md:text-lg hover:no-underline' onClick={handleNavbarCloseMobile}>
              Home
            </a> */}
            <Link className={linkStyle} href={{ pathname: "/" }} onClick={handleNavbarCloseMobile}>
              Home
            </Link>
          </li>
          <li className='flex justify-center'>
            {/* <a href='#projects' className='text-xl md:text-lg hover:no-underline' onClick={handleNavbarCloseMobile}>
              Projects
            </a> */}
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "projects" }}
              onClick={handleNavbarCloseMobile}
              scroll={false}
            >
              Projects
            </Link>
          </li>
          <li className='flex justify-center'>
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "skills" }}
              onClick={handleNavbarCloseMobile}
              scroll={false}
            >
              Skills
            </Link>
          </li>
          <li className='flex justify-center'>
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "assignments" }}
              onClick={handleNavbarCloseMobile}
              scroll={false}
            >
              Assignments
            </Link>
          </li>
          {/*  <li>
            <span className='text-xl md:text-lg'>Contact</span>
          </li> */}
        </ul>
        <div className='flex flex-row items-center order-2 md:order-3 justify-self-end gap-x-3 md:gap-x-4'>
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

const linkStyle =
  "h-full text-xl md:text-lg hover:no-underline text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-zinc-50";
