// Significant portions of this code is taken from:
// https://github.com/jiangbo2015/framer-motion-carousel

interface IDots {
  length: number;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const table = {
  0: "first",
  1: "second",
  2: "third",
  3: "fourth",
  4: "fifth",
  5: "sixth",
};

const Dots: React.FC<IDots> = ({ length, activeIndex, setActiveIndex }) => {
  return (
    <div className='flex items-center justify-center col-span-3 gap-0.5 carousel-dots'>
      {new Array(length).fill("").map((_, i) => (
        <button
          onClick={() => setActiveIndex(i)}
          key={i}
          className={`h-7 w-7 p-2 `}
          aria-label={`View ${table[i as keyof typeof table] || i} item`}
          type='button'
        >
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
