import { EMailIcon } from "components/icons";
import Link from "next/link";

export function Footer() {
  return (
    <footer className='p-8 bg-zinc-900 text-zinc-200 md:px-12 md:pt-12 md:pb-28'>
      <div className='grid w-full h-full max-w-screen-xl grid-cols-1 gap-y-8 mx-auto gap-x-2 md:grid-cols-2 lg:grid-cols-4 place-items-start grid-rows-[auto] md:grid-rows-2 lg:grid-rows-1'>
        <div className='space-y-3'>
          <h3 className='text-sm text-zinc-400'>Navigation</h3>
          <ul className='space-y-2 '>
            <li>
              <Link className={linkStyle} href={{ pathname: "/" }}>
                Home
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "projects" }} scroll={false}>
                Projects
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "skills" }} scroll={false}>
                Skills
              </Link>
            </li>
            <li>
              <Link className={linkStyle} href={{ pathname: "/", hash: "assignments" }} scroll={false}>
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
              <Link className={linkStyle} href={{ pathname: "/about" }}>
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
                Github
              </a>
            </li>
            {/* TODO add LinkedIn */}
            <li>
              <a className={linkStyle}>LinkedIn</a>
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
            className='flex flex-row items-center justify-center p-2 mt-4 font-semibold leading-tight text-white bg-indigo-600 rounded hover:no-underline hover:bg-indigo-700 gap-x-2'
            href='mailto:niklas.fischer@mail.de'
          >
            <EMailIcon classNames='inline-block h-4 w-4 align-middle text-inherit' />
            <span>Contact</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const linkStyle =
  "block text-xl md:text-lg hover:no-underline hover:text-white text-zinc-100 hover:font-medium hover:cursor-pointer";
