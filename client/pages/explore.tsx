import React, { useEffect, useState } from "react";
import { getAllLinkLooms } from "../flow/scripts";
import Spinner from "../components/ui/Spinner";
import { FlowLinkResponse } from "../flow/types";
import { DEFAULT_AVATAR } from "../components/Builder/Card";
import Link from "next/link";
import AppContainer from "../layouts/AppContainer";

type Props = {};

const Explore = (props: Props) => {
  const [linkLooms, setLinkLooms] = useState<FlowLinkResponse[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getAllLinkLooms();
      console.log(res);
      setLinkLooms(res);
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) {
    return (
      <AppContainer>
      <div className="section__height heading gap-4 flex flex-col text-2xl items-center justify-center">
        <Spinner size="lg" /> 
        Loading
      </div>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      
    <div className="p-4  grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
      {linkLooms?.map((item) => (
        <Link
        href={`/@${item?.domainName}`}
        key={`explore-${item.id}`}
        className="bg-gray-800/50 flex hover:scale-105 duration-200 ease-out items-center gap-4 border border-gray-700 p-4 rounded-xl"
        >
          <img
            src={item?.avatar || DEFAULT_AVATAR}
            className="h-20  aspect-square rounded-lg w-20 bg-white overflow-hidden"
            alt=""
            />
          <div>
            <div className="text-2xl text-flow-400 heading font-semibold tracking-wider">@{item?.domainName}</div>
            <div className=" text-gray-600 font-semibold">Owned by <span className="text-gray-500 heading"> {item?.owner} </span></div>
          </div>
        </Link>
      ))}
    </div>
      </AppContainer>
  );
};

export default Explore;
