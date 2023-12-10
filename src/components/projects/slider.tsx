// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel
import { motion, MotionValue, PanInfo } from "framer-motion";

interface ISlider {
  x: MotionValue<number>;
  children: React.ReactNode;
  onDragEnd: (e: Event, dragProps: PanInfo) => void;
  totalSliders: number;
}
const Slider: React.FC<ISlider> = ({ x, onDragEnd, children, totalSliders }) => (
  <motion.div
    style={{ x }}
    className='flex flex-none w-full h-full'
    drag={totalSliders > 1 && "x"}
    dragElastic={0}
    onDragEnd={onDragEnd}
  >
    {children}
  </motion.div>
);

export default Slider;
