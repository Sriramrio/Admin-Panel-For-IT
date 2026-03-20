import { Spinner } from './spinner';
export const Component = () => {
  return (
    <>
      <div className='group relative cursor-pointer p-1 w-40 border bg-white rounded-xl overflow-hidden text-black text-center font-medium'>
        <span className='translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block'>
          Download Report
        </span>
        <div className='flex gap-2 text-white bg-green-400 z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none '>
          <span>Downloading</span><Spinner/>
        </div>
      </div>
    </>
  );
};