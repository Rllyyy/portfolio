// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

import { PropsWithChildren, FC } from "react";

const Arrow: FC<PropsWithChildren<{ onClick: () => void }>> = ({ children, onClick }) => (
  <button onClick={onClick} className='flex items-center justify-center p-1 rounded-full md:p-2 '>
    {children}
  </button>
);

export default Arrow;
