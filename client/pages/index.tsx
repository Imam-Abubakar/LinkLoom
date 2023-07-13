import type { NextPage } from "next";
import Card from "../components/Builder/Card";
import Tilt from "react-parallax-tilt";
import { Text, Timeline, Title } from "@mantine/core";
import { TbBrandGithub } from "react-icons/tb";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import AppContainer from "../layouts/AppContainer";

const Home: NextPage = () => {
  return (
    <AppContainer>
      <div className="flex h-full flex-col">
        <div className="flex flex-col justify-center items-center px-8 pt-8 pb-1 md:px-12 lg:flex-row lg:px-24">
          <div className="w-full mx-auto lg:max-w-6xl">
            <div className="text-center lg:p-10 lg:text-left">
              <div>
                <p className="text-4xl heading text-center lg:text-6xl font-semibold">
                Unleash the Power of your Links  with <span className="text-flow-500 heading">  LinkLoom </span>
                </p>
                <p className=" mt-5 text-lg text-center lg:text-2xl tracking-tight text-gray-400">
                Own, Showcase, and Weave Your Digital Identity on <a href="https://flow.com/" className="underline underline-offset-8 decoration-gray-700 hover:text-flow-500 font-medium relative">  Flow blockchain </a>
                </p>{" "}
              </div>
              <div className="flex flex-col justify-center gap-3 mt-8 sm:flex-row ">
                <a
                  className="inline-flex text-md tracking-wider gap-2 items-center justify-center w-full px-6 py-3 text-center text-flow-500  bg-flow-900/10 border border-flow-500 group duration-100 hover:scale-105 font-medium rounded-full focus:outline-none lg:w-auto"
                  href="builder"
                >
                  Claim your Thread <FaArrowRight style={{fill:"#00bbef"}} className="group-hover:translate-x-2 duration-200 ease-out"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-10 lg:mt-5">
          <Tilt>
            <Card
              minted={false}
              displayName="John Doe"
              username="johndoe"
              title="Community Manager"
              bio="Community manger at LinkLoom, Product Designer, UX Writer"
              twitter="https:www.twitter.com/"
              github="https:www.github.com/"
              linkedin="https:www.linkedin.com"
              instagram="https:www.instagram.com"
              whatsapp="https:www.whatsapp.com"
              gmail="mail"
              otherLinks={[
                {title:'Link 1',href:'https://www.example.com'},
                {title:'Link 2',href:'https://www.example.com'}
              ]}
              avatarStyle='rounded-md'
              avatar=""
              cover=""
              theme="#e4e4e7 #a1a1aa #3f3f46 #27272a"
            />
          </Tilt>
        </div>
      </div>
      
    </AppContainer>
  );
};

export default Home;
