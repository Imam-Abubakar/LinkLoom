import { ActionIcon, CopyButton, Tabs, Tooltip } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { TbCopy } from "react-icons/tb";
import { FiCheck } from "react-icons/fi";
import { getOwnedLinks } from "../flow/scripts";
import { FlowLinkResponse } from "../flow/types";
import Spinner from "../components/ui/Spinner";
import Link from "next/link";
import Button from "../components/ui/Button";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import toast from "react-hot-toast";
import Card from "../components/Builder/Card";
import AppContainer from "../layouts/AppContainer";
import Router from "next/router";

const DashboardPage = () => {
  const supabase = useSupabaseClient();
  const { currentUser, logIn } = useAuth();
  const user = useUser();
  const [ownedNFTs, setOwnedNFTs] = useState<FlowLinkResponse[]>([]);
  const [savedNfts, setSavedNfts] = useState<FlowLinkResponse[]>([]);
  const [loadingMintedNfts, setLoadingMintedNfts] = useState<boolean>();
  const [loadingSavedNfts, setLoadingSavedNfts] = useState<boolean>();
  const [ownedNFTDomains, setOwnedNFTDomains] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingMintedNfts(true);
        const res = await getOwnedLinks(currentUser?.addr);
        setOwnedNFTs(res);
        const domains = res.map((val: any) => val.domainName);
        setOwnedNFTDomains(domains);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingMintedNfts(false);
      }
    };
    if (currentUser?.addr) getData();
  }, [currentUser]);

  const getSavedNFTs = async () => {
    try {
      setLoadingSavedNfts(true);
      if (!user) throw new Error("No user");

      let { data, error, status } = await supabase
        .from("nfts")
        .select("*")
        .eq("owner", user.id);

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        let temp: FlowLinkResponse[] = [];
        for (let nft of data) {
          const styles = nft.styles.split("/");
          let otherLinks = nft.otherlinks.split(",");
          let finalOtherLinks = [];
          if (otherLinks.length && otherLinks[0] !== "") {
            finalOtherLinks = otherLinks.map((val: string) => ({
              title: val.split("-")[0],
              href: val.split("-")[1],
            }));
          }
          temp.push({
            id: nft.id,
            avatar: nft.avatar,
            bio: nft.bio,
            cover: nft.cover,
            displayName: nft.displayname,
            domainName: nft.domainname,
            owner: nft.owner,
            title: nft.title,
            socialLinks: {
              github: nft.github,
              linkedin: nft.linkedin,
              instagram: nft.instagram,
              twitter: nft.twitter,
              youtube: nft.youtube,
              mail: nft.gmail,
              whatsapp:nft.whatsapp,
              facebook: nft.facebook,
              snapchat: nft.snapchat,
              discord: nft.discord,
              telegram: nft.telegram,
              tiktok: nft.tiktok
            },
            otherLinks: finalOtherLinks,
            styles: {
              avatar: styles[0],
              background: styles[1],
              theme: styles[2],
              card: "rounded",
            },
          });
        }
        setSavedNfts(temp);
      }
    } catch (error) {
      toast("Error loadingMintedNfts saved nfts!");
      console.log(error);
    } finally {
      setLoadingSavedNfts(false);
    }
  };

  const handleDelete = async (username: string) => {
    try {
      setLoading(true);
      if (!user) throw new Error("No user");

      let { error, status } = await supabase
        .from("nfts")
        .delete()
        .eq("domainname", username)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      setSavedNfts((sn) => sn.filter((val) => val.domainName !== username));
      toast.success("NFT deleted sucessfully");
    } catch (error) {
      toast("Error deleting nft data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) getSavedNFTs();
  }, [user]);

  return (
    <AppContainer>
      <div className="py-8 w-[95vw] mx-auto">
        <div className="flex justify-between flex-col md:flex-row my-4 items-center gap-2">
          <h2 className="heading text-3xl font-bold flex-1">Dashboard</h2>
          {user?.email ? (
            <div className="border-gray-600 font-medium text-gray-400 flex items-center border bg-gray-800 text-md  pl-4 py-2 gap-2 pr-4 rounded-md">
              {user?.email}
            </div>
          ) : (
            <Link
              href={"/auth?redirectTo=/dashboard"}
              className="border-gray-600 font-medium text-gray-400 flex hover:border-gray-200 hover:text-gray-100 active:scale-95 duration-200 ease-out items-center border bg-gray-800 text-md  pl-4 py-2 gap-2 pr-4 rounded-md"
            >
              Login with Email
            </Link>
          )}
          {currentUser?.addr ? (
            <div className="border-gray-600 font-medium text-gray-400 flex items-center border bg-gray-800 text-md  pl-4 py-2 gap-2 pr-4 rounded-md">
              {currentUser?.addr}
              <CopyButton value={currentUser?.addr} timeout={2000}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? "Copied" : "Copy"}
                    withArrow
                    position="right"
                  >
                    <ActionIcon
                      size={28}
                      color={copied ? "flow" : "gray"}
                      onClick={copy}
                    >
                      <div className="p-2">
                        {copied ? <FiCheck size={24} /> : <TbCopy size={24} />}
                      </div>
                    </ActionIcon>
                  </Tooltip>
                )}
              </CopyButton>
            </div>
          ) : (
            <button
              onClick={logIn}
              className="border-gray-600 font-medium text-gray-400 flex hover:border-gray-200 hover:text-gray-100 active:scale-95 duration-200 ease-out items-center border bg-gray-800 text-md  pl-4 py-2 gap-2 pr-4 rounded-md"
            >
              Connect Wallet
            </button>
          )}
        </div>
        <Tabs defaultValue="owned" radius={"md"}>
          <Tabs.List>
            <Tabs.Tab style={{ fontSize: 16 }} value="owned">
              Owned
            </Tabs.Tab>
            <Tabs.Tab style={{ fontSize: 16 }} value="mintLater">
              Saved
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="owned" pt="lg">
            {currentUser?.addr ? (
              <div className="flex flex-col gap-4">
                {loadingMintedNfts && (
                  <div className="flex gap-2 items-center text-md">
                    <Spinner /> Loading Minted NFTs...
                  </div>
                )}
                {!loadingMintedNfts &&
                  ownedNFTs?.map((item) => (
                    <div
                      className="p-4 hover:border-l-2  hover:border-l-flow-500 duration-100 flex items-center gap-4 rounded-lg  bg-gray-800/50  border border-gray-700"
                      key={`linkloom-${item.domainName}`}
                    >
                      <div className="font-bold text-lg flex-1">
                        @ {item?.domainName}
                      </div>
                      <Link
                        href={
                          "https://linkloom.vercel.app/@" + item?.domainName
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Button variant="success">View LinkLoom</Button>
                      </Link>
                      <Link
                        href={
                          "https://linkloom.vercel.app/edit/" + item?.domainName
                        }
                      >
                        <Button variant="warning">Edit </Button>
                      </Link>

                      <CopyButton
                        value={
                          "https://linkloom.vercel.app/@" + item?.domainName
                        }
                        timeout={2000}
                      >
                        {({ copied, copy }) => (
                          <div className="flex gap-1 heading font-medium text-gray-400 hover:text-gray-100 cursor-pointer items-center border border-gray-600 py-2 px-4 rounded-lg">
                            {copied ? "Copied" : "Copy Share link"}
                            <ActionIcon
                              size={28}
                              color={copied ? "flow" : "gray"}
                              onClick={copy}
                            >
                              <div className="p-2 ">
                                {copied ? (
                                  <FiCheck size={24} />
                                ) : (
                                  <TbCopy size={24} />
                                )}
                              </div>
                            </ActionIcon>
                          </div>
                        )}
                      </CopyButton>
                    </div>
                  ))}
                {!loadingMintedNfts && ownedNFTs.length === 0 && (
                  <div className="text-md text-gray-400">
                    You don't own any Threads{" "}
                    <Link
                      href={"/builder"}
                      className="text-md underline text-gray-100 hover:text-flow-500 underline-offset-4"
                    >
                      Click Here to mint one
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-md mt-4">
                Connect wallet to see minted NFTs
              </div>
            )}
          </Tabs.Panel>
          <Tabs.Panel value="mintLater" pt="lg">
            <div className="flex w-full gap-10 text-md flex-wrap justify-between px-20 py-10 overflow-y-auto">
              {user &&
                !loadingSavedNfts &&
                savedNfts.map((nft: FlowLinkResponse, idx) => {
                  return (
                    <Card
                      theme={nft.styles.theme || ""}
                      username={nft.domainName}
                      twitter={nft.socialLinks.twitter || ""}
                      github={nft.socialLinks.github || ""}
                      linkedin={nft.socialLinks.linkedin || ""}
                      instagram={nft.socialLinks.instagram || ""}
                      youtube={nft.socialLinks.youtube || ""}
                      gmail={nft.socialLinks.mail || ""}
                      facebook={nft.socialLinks.facebook || ""}
                      discord={nft.socialLinks.discord || ""}
                      snapchat={nft.socialLinks.snapchat || ""}
                      whatsapp={nft.socialLinks.whatsapp || ""}
                      tiktok={nft.socialLinks.tiktok || ""}
                      telegram={nft.socialLinks.telegram || ""}
                      avatarStyle={nft.styles.avatar || ""}
                      key={idx}
                      handleDelete={handleDelete}
                      loading={loading}
                      minted={ownedNFTDomains.includes(nft.domainName)}
                      {...nft}
                    />
                  );
                })}
              {!user && "Please sign-in to view your saved NFTs."}
              {user &&
                savedNfts.length === 0 &&
                "You haven't saved any NFT designs yet."}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </AppContainer>
  );
};

export default DashboardPage;
