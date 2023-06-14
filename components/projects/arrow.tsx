// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

import { PropsWithChildren, FC } from "react";

interface IArrow {
  onClick: () => void;
  direction: "previous" | "next";
}

const Arrow: FC<PropsWithChildren<IArrow>> = ({ children, onClick, direction }) => (
  <button
    onClick={onClick}
    className='flex items-center justify-center p-1 rounded-full md:p-2'
    aria-label={`View ${direction} item`}
  >
    {children}
  </button>
);

export default Arrow;
