// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

interface IDots {
  length: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Dots: React.FC<IDots> = ({ length, activeIndex, setActiveIndex }) => {
  return (
    <div className='flex items-center justify-center col-span-3 gap-[2px]'>
      {new Array(length).fill("").map((_, i) => (
        <button onClick={() => setActiveIndex(i)} key={i} className={`h-7 w-7 p-2 `}>
          <div
            className={`w-full h-full rounded-full ${
              i === activeIndex ? "bg-zinc-700 dark:bg-zinc-300 scale-[1.3]" : "bg-zinc-300 dark:bg-zinc-600 scale-100"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default Dots;
