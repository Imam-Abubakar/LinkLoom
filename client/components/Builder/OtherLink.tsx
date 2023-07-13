import Link from "next/link";
import React from "react";
import { FiLink, FiArrowRight } from "react-icons/fi";

type Props = {
  title: string | undefined;
  link: string | undefined;
  userTheme:any
};
const OtherLink:React.FC<Props> = ({title,link,userTheme}) => {
  return (
    <Link href={link===undefined?'#':link} target="_blank" rel='noreferrer'>
      <div  style={userTheme && {backgroundColor:userTheme.c4}} className={`flex justify-between items-center  hover:brightness-125 ease-linear duration-150 active:scale-95 flex-row mt-2 bg-gray-800/10 p-2 px-3 rounded-md`}>
        <div style={userTheme && {backgroundColor:userTheme.c4,color:userTheme.c1}} className='text-gray-50/70'>{title}</div>
        <div>
          <FiArrowRight style={{stroke:userTheme?.c1}}/>
        </div>
      </div>
    </Link>
  );
};

export default OtherLink;
