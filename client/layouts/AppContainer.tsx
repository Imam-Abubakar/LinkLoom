import React, { useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/navbar/Navbar";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import useBaseUser from "../store/useBaseUser";
import Link from "next/link";
import { TbBrandGithub } from "react-icons/tb";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const AppContainer = ({ children }: any) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { setUser } = useBaseUser();

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setUser({ avatar_url: url });
    } catch (error) {
      console.log("Error downloading image: ", error);
    }
  }

  const fetchAndSetAvatarUrl = async () => {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`avatar_url`)
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data && typeof data.avatar_url === "string") {
      downloadImage(data.avatar_url);
    }
  };

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        username: user.user_metadata.username,
        avatar_url: user.user_metadata.avatar_url,
        email: user.email,
        full_name: user.user_metadata.full_name,
        website: user.user_metadata.website,
      });
      fetchAndSetAvatarUrl();
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>LinkLoom - Unleash the Power of your Links!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <Navbar />
        <div className="max-w-screen-2xl mx-auto  ">{children}</div>
        <div className="flex flex-col gap-8 px-32  my-12 pb-16 justify-center">
          <footer className="flex flex-col gap-3 text-center items-center justify-between md:w-80 border-t border-gray-600 pt-8">
            <div className="font-medium text-md lg:text-2xl text-flow-500">Link<span className="text-white">Loom</span></div>
            <Link
              href={"https://github.com/Imam-Abubakar/LinkLoom"}
              className="flex items-center gap-2 text-md lg:text-xl"
            >
              {" "}
              <TbBrandGithub />
              Github
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default AppContainer;
