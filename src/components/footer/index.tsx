import Link from "next/link";
import { Icon } from "../icons";

export function Footer() {
  return (
    <footer className='p-8 bg-zinc-900 text-zinc-200 md:px-12 md:pt-12 md:pb-28'>
      <div className='grid w-full h-full max-w-(--breakpoint-xl) grid-cols-1 gap-y-8 mx-auto gap-x-2 md:grid-cols-2 lg:grid-cols-4 place-items-start grid-rows-[auto] md:grid-rows-2 lg:grid-rows-1'>
        <div className='space-y-3'>
          <h3 className='text-sm text-zinc-400'>Navigation</h3>
          <ul className='space-y-2 '>
            <li>
              <Link className={linkStyle} href={{ pathname: "/" }}>
                Home
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "projects" }} scroll={true}>
                Projects
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "skills" }} scroll={true}>
                Skills
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "assignments" }} scroll={true}>
                Academic Assignments
              </Link>
            </li>
          </ul>
        </div>
        <div className='space-y-2'>
          <h3 className='text-sm text-zinc-400'>Legal</h3>
          <ul className='space-y-2'>
            <li>
              <Link className={linkStyle} href={{ pathname: "/about" }}>
                About
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/privacy" }}>
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className='space-y-2'>
          <h3 className='text-sm text-zinc-400'>Links</h3>
          <ul className='space-y-2'>
            <li>
              <a className={linkStyle} href='https://github.com/Rllyyy' target='_blank' rel='noopener noreferrer'>
                GitHub
              </a>
            </li>
            <li>
              <a
                className={linkStyle}
                href='https://www.linkedin.com/in/niklas-fischer-dev/'
                target='_blank'
                rel='noopener noreferrer'
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className={linkStyle}
                href='https://stackoverflow.com/users/14602331/rllyyy'
                target='_blank'
                rel='noopener noreferrer'
              >
                StackOverflow
              </a>
            </li>
          </ul>
        </div>
        <div className='flex flex-col px-6 py-4 border border-gray-700 rounded-lg bg-zinc-800 w-full md:max-w-[300px] justify-self-start'>
          <p className='text-lg font-semibold text-zinc-50'>Niklas Fischer</p>
          <p>niklas.fischer@mail.de</p>
          <a
            className='flex items-center justify-center p-2 mt-4 font-semibold leading-tight text-center text-white bg-indigo-600 rounded hover:no-underline hover:bg-indigo-700 gap-x-1'
            href='mailto:niklas.fischer@mail.de'
          >
            <Icon.EMail className='w-4 h-4' width={16} height={16} />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const linkStyle =
  "block text-xl md:text-lg hover:no-underline hover:text-white text-zinc-100 hover:font-medium hover:cursor-pointer";
