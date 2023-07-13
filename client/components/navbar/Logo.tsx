import Link from "next/link";
import React from "react";
import { FiLink } from "react-icons/fi";


const Logo = () => {
  return (
    <Link href={"/"}>
      <div className='flex flex-row justify-center items-center group active:scale-95 ease-linear duration-150 lg:ml-[9rem]'>
        <div className='text-xl heading tracking-wider font-black text-flow-500  group-hover:text-white  ease-linear duration-150'>
          Link<span className="text-white text-xl heading tracking-wider font-black  group-hover:text-flow-500   ease-linear duration-150">Loom</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
