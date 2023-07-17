import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "../../public/linkloom.png";


const Logo = () => {
  return (
    <Link href={"/"}>
      <div className='flex flex-row justify-center items-center group active:scale-95 ease-linear duration-150 lg:ml-[9rem]'>
        <div className='text-xl heading tracking-wider font-black text-flow-500  group-hover:text-white  ease-linear duration-150'>
          <Image src={logo} alt={"LinkLoom"} width={180} height={100}/>
          </div>
      </div>
    </Link>
  );
};

export default Logo;
