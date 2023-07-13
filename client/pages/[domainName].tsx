import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Card from "../components/Builder/Card";
import Button from "../components/ui/Button";
import ShowcaseFooter from "../components/ui/ShowcaseFooter";
import { checkIsAvailable, getLinkLoomByDomainName } from "../flow/scripts";
import Spinner from "../components/ui/Spinner";

type Props = {};

const LinkLoomShowcasePage = (props: Props) => {
  const router = useRouter();
  const slug = router?.query?.domainName as string;
  const domainName = slug?.substring(1);
  const [data, setData] = useState<any>();
  const [exists, setExists] = useState<boolean>(false);
  const [loading, setLoaindg] = useState(true);
  //State for card inputs

  // If domainName is not prefixed with @ , then add it
  useEffect(() => {
    if (slug) {
      if (!slug?.startsWith("@")) {
        router.push("@" + slug);
      }
    }
  }, [slug]);

  // Fetch LinkLoomData
  useEffect(() => {
    const getData = async () => {
      try {
        setLoaindg(true);
        //Check if domain Name is available to take or not
        const isAvailable = await checkIsAvailable(domainName);
        setExists(!isAvailable);
        // if taken , it means nft exists and we can get the data
        if (!isAvailable) {
          const res = await getLinkLoomByDomainName(domainName);
          console.log(res);
          setData(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoaindg(false);
      }
    };
    if (domainName) {
      getData();
    }
  }, [domainName]);

  if (loading) {
    return (
      <div className=" flex flex-col justify-center heading gap-4 font-medium tracking-wider text-3xl  w-screen h-screen items-center">
          <Spinner size="lg" /> Loading 

        <div className="fixed bottom-4 ">
          <Link href={"/"}>
            <ShowcaseFooter />
          </Link>
        </div>
      </div>
    );
  }

  if (!loading && !exists) {
    return (
      <div className=" flex flex-col justify-center font-medium tracking-wider gap-8 w-screen h-screen items-center">
        <div className="heading text-center text-gray-300 text-lg">
          This domain has not been claimed yet ,<br></br> you can be the first
          one to claim it
        </div>
        <Button variant="success" onClick={() => router.push("builder")}>
          Claim Your LinkLoom
        </Button>
        <div className="fixed bottom-4 ">
          <Link href={"/"}>
            <ShowcaseFooter />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={
        data &&
        data.styles["background"] && {
          backgroundImage: data.styles["background"],
        }
      }
      className=" flex justify-center flex-col w-screen h-screen overflow-y-scroll items-center"
    >
      <Card
        minted={false}
        displayName={data && data.displayName}
        theme={data ? data.styles["theme"] : ""}
        username={data ? data.domainName : ""}
        bio={data ? data.bio : ""}
        title={data ? data.title : ""}
        twitter={data ? data.socialLinks["twitter"] : ""}
        github={data ? data.socialLinks["github"] : ""}
        linkedin={data ? data.socialLinks["linkedIn"] : ""}
        instagram={data ? data.socialLinks["instagram"] : ""}
        youtube={data ? data.socialLinks["youtube"] : ""}
        gmail={data ? data.socialLinks["mail"] : ""}
        facebook={data ? data.socialLinks["facebook"] : ""}
        discord={data ? data.socialLinks["discord"] : ""}
        snapchat={data ? data.socialLinks["snapchat"] : ""}
        whatsapp={data ? data.socialLinks["whatsapp"] : ""}
        tiktok={data ? data.socialLinks["tiktok"] : ""}
        telegram={data ? data.socialLinks["telegram"] : ""}
        otherLinks={data ? data.otherLinks : [{}]}
        avatarStyle={data ? data.styles["avatar"] : ""}
        avatar={data ? data.avatar : ""}
        cover={data ? data.cover : ""}
      />

      <div className="mt-8">
        <Link href={"/"}>
          <ShowcaseFooter />
        </Link>
      </div>
    </div>
  );
};

export default LinkLoomShowcasePage;
