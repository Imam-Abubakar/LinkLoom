import React from "react";

const Hero = () => {
  return (
    <div className='h-screen flex flex-row justify-center items-center'>
      {/*Left */}
      <div className='h-full w-full flex flex-col justify-center text-2xl mb-32'>
        <div className='flex flex-col font-bold text-5xl leading-[4rem] mb-8'>
          <div className="text-zinc-100">One place to showcase</div>
          <div className=" text-transparent bg-clip-text bg-gradient-to-br from-flow-700 via-flow-500 to-flow-800">All of your links</div>
        </div>
        <div className='flex flex-row space-x-4'>
        </div>
      </div>
      {/*Right */}
      <div className='h-full w-full flex flex-col justify-center items-end relative'>
        <div className="h-[28rem] w-96 border border-zinc-700 bg-zinc-900/90 mb-20 rounded-xl">

        </div>

        <div className="h-60 w-60 absolute bg-gradient-to-br from-flow-700 via-flow-500 to-flow-800 blur-3xl bg-flow-500 opacity-50 -z-10">

        </div>

      </div>
    </div>
  );
};

export default Hero;
