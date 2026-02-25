"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BurgerIcon, ThemeSwitchIcon, XMarkIcon } from "./icons";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [showNavMobile, setShowNavMobile] = useState(false);
  const isSmall = useIsSmall();

  const isTop = useScrollYPosition();

  // Get current theme to be either system or dark/light if the user clicked on the theme switcher (and saved the state to local storage)
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Update the theme
  const handleThemeSwitch = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  // Update the display of the menu items on mobile
  const handleNavClick = () => {
    setShowNavMobile((prevShowNav) => !prevShowNav);
  };

  // Minimize the navbar on mobile if clicking on a menuitem
  const handleNavbarCloseMobile = () => {
    // Return if the user is not using mobile viewport
    if (window.innerWidth >= 768) return;

    // Update the state
    setShowNavMobile(false);
  };

  // Using the custom hook useIsMounted does fail on github actions
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full md:h-auto duration-200 print:hidden ${
        isSmall && showNavMobile ? "h-dvh" : ""
      } ${
        isTop
          ? "bg-zinc-100 dark:bg-dark-100 border-none"
          : "bg-zinc-50 dark:bg-black border-b-zinc-300 border-b dark:border-none"
      }`}
    >
      <div
        className={`grid content-center w-full grid-cols-[1fr_max-content] px-4 lg:px-6 mx-auto max-w-screen-4xl duration-200 md:grid-cols-[max-content_1fr_max-content] grid-rows-[max-content_1fr] md:grid-rows-[auto] h-full md:h-auto md:gap-x-24 ${
          isTop ? "py-8 md:py-16" : "py-2.5"
        }`}
      >
        <Link href={{ pathname: "/" }} className='self-center hover:no-underline'>
          <h1 className='text-xl font-semibold text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-zinc-100'>
            Niklas Fischer
          </h1>
        </Link>
        <ul
          className={`flex flex-col md:flex-row gap-y-[5%] md:gap-y-0 gap-x-6 text-lg md:relative  md:w-auto w-full px-6 py-2 md:p-0 text-center duration-200 justify-center items-center order-3 md:order-2 col-span-2 md:col-span-1 overscroll-none md:ml-auto ${
            isSmall && !showNavMobile ? "hidden" : ""
          } ${isTop ? "bg-zinc-100 dark:bg-dark-100" : "bg-zinc-50 dark:bg-black "}`}
        >
          <li className='flex justify-center'>
            <Link className={linkStyle} href={{ pathname: "/" }} onClick={handleNavbarCloseMobile}>
              Home
            </Link>
          </li>
          <li className='flex justify-center'>
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "projects" }}
              onClick={handleNavbarCloseMobile}
              scroll={true}
            >
              Projects
            </Link>
          </li>
          <li className='flex justify-center'>
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "skills" }}
              onClick={handleNavbarCloseMobile}
              scroll={true}
            >
              Skills
            </Link>
          </li>
          <li className='flex justify-center'>
            <Link
              className={linkStyle}
              href={{ pathname: "/", hash: "assignments" }}
              onClick={handleNavbarCloseMobile}
              scroll={true}
            >
              Assignments
            </Link>
          </li>
        </ul>
        <div className='flex flex-row items-center order-2 md:order-3 justify-self-end gap-x-3 md:gap-x-4'>
          <button
            className='cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 transition-[background] p-1'
            onClick={handleThemeSwitch}
            aria-label={currentTheme === "light" ? "Use dark mode" : "Use light mode"}
            type='button'
          >
            <ThemeSwitchIcon currentTheme={currentTheme} className='w-6 h-6 ' />
          </button>
          <button
            onClick={handleNavClick}
            className='md:hidden'
            aria-label={!showNavMobile ? "Show navigation" : "Hide navigation"}
            type='button'
          >
            {!showNavMobile ? <BurgerIcon /> : <XMarkIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function subscribe(onStoreChange: () => void) {
  global.window?.addEventListener("scroll", onStoreChange, { passive: true });
  return () => global.window?.removeEventListener("scroll", onStoreChange);
}

function useScrollYPosition() {
  return useSyncExternalStore(
    subscribe,
    () => global.window?.scrollY === 0,
    () => undefined,
  );
}

function subscribeWindowResize(onWindowResize: () => void) {
  global.window?.addEventListener("resize", onWindowResize);
  return () => global.window.removeEventListener("resize", onWindowResize);
}

function useIsSmall() {
  return useSyncExternalStore(
    subscribeWindowResize,
    () => global.window?.innerWidth < 768,
    () => false,
  );
}

const linkStyle =
  "h-full text-lg md:text-base leading-none hover:no-underline text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-zinc-50";
