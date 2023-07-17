import React, { useEffect, useState } from "react";
import Preview from "../components/Builder/Preview";
import { useAuth } from "../context/AuthContext";
import { checkIsInitialized } from "../flow/scripts";
import Button from "../components/ui/Button";
import { mintNFT } from "../flow/transactions";
import InfoControls from "../components/Builder/InfoControls";
import StyleControls from "../components/Builder/StyleControls";
import { Modal } from "@mantine/core";

import Router from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useControls } from "../store/useControls";
import toast from "react-hot-toast";

import { Tabs } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa";
import AppContainer from "../layouts/AppContainer";

export type LinkType = {
  title: string;
  href: string;
};

const Builder = () => {
  const [tab, setTab] = useState("Details");
  const { currentUser } = useAuth();
  const [mintModal, setMintModal] = useState<boolean>(false);
  const [minting, setMinting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser?.addr) checkIsInitialized(currentUser?.addr);
  }, [currentUser]);

  const { logIn } = useAuth();
  const user = useUser();

  const nftConfig = useControls();
  const supabase = useSupabaseClient();

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  const saveForLater = async () => {
    let finalData = {
      id: uuid,
      owner: user?.id,
      domainname: nftConfig.username,
      avatar: nftConfig.avatar,
      cover: nftConfig.cover,
      title: nftConfig.title,
      bio: nftConfig.bio,
      displayname: nftConfig.displayName,
      github: nftConfig.github,
      linkedin: nftConfig.linkedin,
      twitter: nftConfig.twitter,
      youtube: nftConfig.youtube,
      instagram: nftConfig.instagram,
      facebook: nftConfig.facebook,
      discord: nftConfig.discord,
      snapchat: nftConfig.snapchat,
      whatsapp: nftConfig.whatsapp,
      tiktok: nftConfig.tiktok,
      telegram: nftConfig.telegram,
      otherlinks: nftConfig.otherLinks
        .map((val) => `${val?.title}-${val?.href}`)
        .join(","),
      styles: `${nftConfig?.avatarStyle || "square"}/${
        nftConfig?.userBgColor || ""
      }/${nftConfig?.userTheme}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      setSaving(true);
      let { error } = await supabase.from("nfts").insert(finalData);
      if (error) throw error;
      toast("NFT saved successfully!");
    } catch (error) {
      toast("Error updating the data!");
      console.log(error);
    } finally {
      setSaving(false);
      setMintModal(false);
    }
  };

  return (
    <>
      <AppContainer>
        <div className=" text-white w-[90vw] mx-auto mb-8 flex flex-col md:flex-row">
          <Preview />

          <div className=" md:w-[48%] w-[90%] mx-auto flex flex-col flex-wrap">
            <div className="p-2 mt-4  select-none">
              <Tabs variant="default" defaultValue="Details">
                <Tabs.List>
                  <Tabs.Tab value="Details" onClick={() => setTab("Details")}>
                    Details
                  </Tabs.Tab>
                  <Tabs.Tab value="Themes" onClick={() => setTab("Themes")}>
                    Appearance
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </div>

            {tab === "Details" && (
              <>
                <InfoControls setErr={setErr} />
              </>
            )}
            {tab === "Themes" && <StyleControls />}
            {err.length > 0 && (
              <ul className="bg-red-800/20 p-4 mt-4 rounded-lg border border-red-400">
                {err?.map((it) => (
                  <li className="text-red-400 list-disc list-inside">{it}</li>
                ))}
              </ul>
            )}
            <button
              onClick={() => {
                const { displayName, username } = nftConfig;
                if (!displayName) {
                  setErr((err) => [...err, "Display Name is required"]);
                }
                if (!username) {
                  setErr((err) => [...err, "Domain Name is required"]);
                }
                if (!displayName || !username) return;
                setErr([]);
                setMintModal(true);
              }}
              className="disabled:opacity-50 flex tracking-wider para mt-8  mb-8   gap-2 items-center justify-center px-6 py-3 text-center text-flow-500  bg-flow-900/10 border border-flow-500 group duration-100 hover:scale-105 font-medium rounded-full focus:outline-none"
            >
              Mint this NFT{" "}
              <FaArrowRight
                style={{ fill: "#00bbef" }}
                className="group-hover:translate-x-2 duration-200 ease-out"
              />
            </button>
          </div>
        </div>
        <Modal
          opened={mintModal}
          onClose={() => setMintModal(false)}
          centered
          overlayOpacity={0.55}
          overlayBlur={3}
          radius={"lg"}
        >
          <div className="flex flex-col w-full h-full   gap-3 ">
            <Button
              loading={minting}
              onClick={async () => {
                if (currentUser.addr) {
                  try {
                    setMinting(true);

                    const mintTx = await mintNFT(currentUser.addr, {
                      avatar: nftConfig.avatar,
                      bio: nftConfig.bio,
                      displayName: nftConfig.displayName,
                      domainName: nftConfig.username,
                      title: nftConfig.title,
                      cover: nftConfig.cover,
                      otherLinks: nftConfig.otherLinks,
                      socialLinks: {
                        linkedIn: nftConfig.linkedin,
                        instagram: nftConfig.instagram,
                        twitter: nftConfig.twitter,
                        github: nftConfig.github,
                        youtube: nftConfig.youtube,
                        mail: nftConfig.gmail,
                        facebook: nftConfig.facebook,
                        discord: nftConfig.discord,
                        snapchat: nftConfig.snapchat,
                        whatsapp: nftConfig.whatsapp,
                        tiktok: nftConfig.tiktok,
                        telegram: nftConfig.telegram,
                      },
                      styles: {
                        background: nftConfig.userBgColor,
                        theme: `${nftConfig.userTheme}`,
                        avatar: nftConfig.avatarStyle,
                        card: "rounded",
                      },
                    });
                    if (mintTx?.statusString === "SEALED") {
                      toast.success("NFT Minted successfully !");
                    }
                  } catch (err) {
                    console.log(err);
                    toast.error("Something went wrong");
                  } finally {
                    setMinting(false);
                    setMintModal(false);
                    Router.push("/dashboard");
                  }
                } else {
                  logIn();
                }
              }}
              variant="none"
              className="bg-gray flex items-center justify-center bg-gray-800/50 !rounded-lg  border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 !text-lg font-medium !p-3  text-gray-400"
            >
              {currentUser.addr
                ? minting
                  ? "Minting ..."
                  : "Mint Now"
                : "Connect wallet and Mint "}
            </Button>
            <Button
              loading={saving}
              onClick={() => {
                if (user) saveForLater();
                else {
                  Router.push("/auth?redirectTo=builder");
                }
              }}
              variant="none"
              className="bg-gray flex items-center justify-center bg-gray-800/50 !rounded-lg border hover:border-flow-600 hover:text-flow-500 hover:bg-flow-900/10 duration-200 ease-out border-gray-700 !text-lg font-medium !p-3  text-gray-400"
            >
              {user
                ? saving
                  ? "Saving..."
                  : "Save as Draft"
                : "Sign-in and Save as Draft"}
            </Button>
          </div>
        </Modal>
      </AppContainer>
    </>
  );
};

export default Builder;
