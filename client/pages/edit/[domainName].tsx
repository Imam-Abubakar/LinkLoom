import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkIsAvailable, getLinkLoomByDomainName } from "../../flow/scripts";
import { LinkLoomResponse } from "../../flow/types";
import Spinner from "../../components/ui/Spinner";
import { useAuth } from "../../context/AuthContext";
import Preview from "../../components/Builder/Preview";
import InfoControls from "../../components/Builder/InfoControls";
import { Button } from "../../components/ui/Button";

type Props = {};

const EditPage = (props: Props) => {
  const router = useRouter();
  const domainName = router?.query?.domainName as string;
  const [data, setData] = useState<LinkLoomResponse>({} as LinkLoomResponse);
  const [exists, setExists] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // If domainName is not prefixed with @ , then add it
  const {currentUser} = useAuth()
  // Fetch LinkLoomData
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        //Check if domain Name is available to take or not
        const isAvailable = await checkIsAvailable(domainName);
        setExists(!isAvailable);
        console.log(domainName)
        console.log(exists)
        // if taken , it means nft exists and we can get the data
        if (!isAvailable) {
          const res = await getLinkLoomByDomainName(domainName);
          console.log(res);
          setData(res);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (domainName && currentUser?.addr) {
      getData();
    }
  }, [domainName]);

  useEffect(()=>{

  },[])

  if(!currentUser?.addr){
    <div className="text-xl section__height flex items-center justify-center">
        <div className="flex gap-4 items-center">
          Please connect your wallet first
        </div>
    </div>
  }
  
  if (loading) {
    return (
      <div className="text-xl section__height flex items-center justify-center">
        <div className="flex gap-4 items-center">
          <Spinner size="lg" /> Loading...
        </div>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="text-xl section__height flex items-center justify-center">
        <div className="flex gap-4 items-center">
          Oops, the LinkLoom does not exist
        </div>
      </div>
    );
  }

  if(data?.owner !== currentUser?.addr) {
    return (
      <div className="text-xl section__height flex items-center justify-center">
        <div className="flex gap-4 items-center">
          Oops, it seems like you are not the owner
        </div>
      </div>
    )
  }


  return <div className="py-8 text-xl section__height flex items-center justify-center">
      <div>  🚧 Under Construction</div>
  </div>;
};

export default EditPage;
