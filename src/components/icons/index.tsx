import { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

export function Icon() {}

const LinkedIn = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className='inline-flex w-6 h-6 align-middle text-inherit fill-inherit'
      fill='inherit'
    >
      <path
        d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
        fill='inherit'
      />
    </svg>
  );
};

Icon.LinkedIn = LinkedIn;

const Stackoverflow = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      className='inline-block w-5 h-5 align-bottom text-inherit fill-inherit'
      width={24}
      height={24}
    >
      <path d='M28.16 32H2.475V20.58H5.32v8.575h19.956V20.58h2.884z' fill='#bcbbbb' /* fill='#F4F4F5' */ />
      <path
        d='M8.477 19.8l13.993 2.923.585-2.806-13.993-2.923zm1.832-6.704l12.94 6.04 1.208-2.572-12.94-6.08zm3.586-6.353l10.99 9.12 1.832-2.183-10.99-9.12zM20.99 0l-2.3 1.715 8.536 11.46 2.3-1.715zM8.166 26.27H22.43v-2.845H8.166v2.845z'
        fill='gray'
      />
    </svg>
  );
};

Icon.Stackoverflow = Stackoverflow;

const GitHub = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      className='inline-block w-6 h-6 align-middle text-inherit fill-inherit'
      viewBox='0 0 20 20'
      width={24}
      height={24}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        className='fill-inherit'
        d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
        transform='scale(1.2)'
      />
    </svg>
  );
};

Icon.GitHub = GitHub;

// https://tabler.io/icons
const PDF = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 3v4a1 1 0 0 0 1 1h4' />
      <path d='M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4' />
      <path d='M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6' />
      <path d='M17 18h2' />
      <path d='M20 15h-3v6' />
      <path d='M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z' />
    </svg>
  );
};

Icon.PDF = PDF;

const Chevron = () => {
  /* https://heroicons.com/ */
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={4}
      stroke='currentColor'
      className='inline-block w-4 h-4'
      height={16}
      width={16}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
    </svg>
  );
};

Icon.Chevron = Chevron;

interface IEMailIcon extends SVGProps<SVGSVGElement> {
  className?: string;
}
const EMailIcon: React.FC<IEMailIcon> = ({ className, ...rest }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      className={twMerge("inline-block w-5 h-5 align-middle fill-current", className)}
      {...rest}
    >
      <path d='M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z' />
      <path d='M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z' />
    </svg>
  );
};

Icon.EMail = EMailIcon;
