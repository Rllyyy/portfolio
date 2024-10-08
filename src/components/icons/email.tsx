import { SVGProps } from "react";
import { twMerge } from "tailwind-merge";

interface IEMailIcon extends SVGProps<SVGSVGElement> {
  className?: string;
}
export const EMailIcon: React.FC<IEMailIcon> = ({ className, ...rest }) => {
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
