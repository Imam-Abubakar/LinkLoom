import { useRouter } from "next/router";
import React from "react";
import { LinkType } from "../../flow/types";
import { useControls } from "../../store/useControls";
import Button from "../ui/Button";
import OtherLink from "./OtherLink";
import SocialLink from "./SocialLink";

export const DEFAULT_AVATAR =
  "https://res.cloudinary.com/da4c8kuqv/image/upload/v1689201025/images_ixlcmj.png";
export const DEFAULT_COVER =
  "https://studiok40.com/wp-content/uploads/2023/02/gray_2_young_girls_with_red_jackets_blue_skirts_and_orange_back_-equal-weighting-to-ideas-of-people-and-distance-but-emphasis-on-style.png";

type Props = {
  displayName: string;
  theme: string;
  username: string;
  bio: string;
  title: string;
  twitter: string;
  github: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  gmail: string;
  facebook: string;
  discord: string;
  snapchat: string;
  whatsapp: string;
  tiktok: string;
  telegram: string;
  otherLinks: LinkType[];
  avatarStyle: string;
  avatar: string;
  cover: string;
  minted: boolean;
  handleDelete?: (username: string) => void;
  loading?: boolean;
};

const Card: React.FC<Props> = ({
  displayName,
  theme,
  username,
  bio,
  title,
  twitter,
  github,
  linkedin,
  instagram,
  youtube,
  gmail,
  facebook,
  discord,
  snapchat,
  whatsapp,
  tiktok,
  telegram,
  otherLinks,
  avatarStyle,
  avatar,
  cover,
  minted = false,
  handleDelete = null,
  loading = false,
}) => {
  const themeData = theme?.split(" ");
  const userTheme = {
    c1: themeData[0],
    c2: themeData[1],
    c3: themeData[2],
    c4: themeData[3],
  };

  const {
    setAvatar,
    setAvatarStyle,
    setBio,
    setCover,
    setDisplayName,
    setGithub,
    setGmail,
    setInstagram,
    setLinkedin,
    setFacebook,
    setDiscord,
    setSnapchat,
    setWhatsapp,
    setTiktok,
    setTelegram,
    setTitle,
    setTwitter,
    setUserName,
    setUserTheme,
    setYoutube,
  } = useControls();

  const router = useRouter();

  const handleEdit = () => {
    setDisplayName(displayName);
    setAvatar(avatar);
    setBio(bio);
    setCover(cover);
    setAvatarStyle(avatarStyle);
    setGithub(github);
    setInstagram(instagram);
    setLinkedin(linkedin);
    setTitle(title);
    setTwitter(twitter);
    setGmail(gmail);
    setFacebook(facebook),
      setDiscord(discord),
      setSnapchat(snapchat),
      setWhatsapp(whatsapp),
      setTiktok(tiktok),
      setTelegram(telegram),
      setUserName(username);
    setUserTheme(theme);
    setYoutube(youtube);
    router.push("/builder");
  };

  return (
    <div
      style={userTheme && { backgroundColor: userTheme.c4 }}
      className={`max-w-[18rem] lg:max-w-sm ${
        minted ? "relative" : ""
      } w-full shadow-2xl overflow-hidden shadow-black/60 p-4 rounded-lg ease-linear duration-150 bg-gray-800/50`}
    >
      {/*Cover and Avatar */}
      {minted && (
        <img
          className="absolute top-0 right-0 w-28 z-10"
          src="/minted_flag.png"
        ></img>
      )}
      <div className="relative mb-10 flex items-center justify-center select-none">
        <div className="h-40 rounded-md w-full  bg-fixed shadow-2xl">
          <img
            src={cover || DEFAULT_COVER}
            className="h-full w-full object-cover object-center bg-flow-500 rounded-md -z-10"
            alt="Cover"
          />
          <div className=" absolute top-0 w-full h-full rounded-md bg-gradient-to-t from-gray-900/80 via-gray-900/0 to-gray-900/0"></div>
        </div>
        <div
          className={`h-24 w-24 absolute ${avatarStyle} -bottom-6 bg-white shadow-xl`}
        >
          <img
            src={avatar || DEFAULT_AVATAR}
            className={`h-full w-full  ${avatarStyle}`}
            alt="Cover"
          />
        </div>
      </div>
      {/*Name / user id / Des */}
      <div
        style={userTheme && { backgroundColor: userTheme.c3 }}
        className={`flex flex-col rounded-md w-full bg-gray-800/50 p-4 ease-linear duration-150`}
      >
        {/*Display Name */}
        <div
          style={userTheme && { color: userTheme.c1 }}
          className="text-gray-50 text-2xl font-semibold text-center leading-5"
        >
          {displayName === "" ? "Your Name" : displayName}
        </div>
        {/*User Name */}
        <div className="text-gray-400 text-base text-center flex flex-col space-y-2 justify-center">
          
          <div
            style={userTheme && { color: userTheme.c2 }}
            className="text-gray-400 text-sm"
          > 
            {username === "" ? "@username" : "@" + username}
          </div>
          
          <div
            style={userTheme && { color: userTheme.c2 }}
            className="text-gray-400"
          >
            {title === "" ? "Your Title" : title}
          </div>
        </div>
        {/*Description */}
        <div
          style={userTheme && { color: userTheme.c1 }}
          className="text-gray-300 text-base text-center pt-2"
        >
          {bio === "" ? "Your bio goes here" : bio}
        </div>

        {/*Other Links */}
        <div className="flex flex-col">
          {otherLinks?.map((e, i) => {
            return (
              <>
                <OtherLink
                  key={i}
                  userTheme={userTheme}
                  title={e.title}
                  link={e.href}
                />
              </>
            );
          })}
        </div>

        {/*Social Links*/}
        <div className="flex flex-row justify-center flex-wrap lg:w-[75%] text-center mt-6 mb-3 mx-auto  gap-2">
          {twitter && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Twitter"
              link={twitter ? twitter : "#"}
            />
          )}

          {github && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Github"
              link={github ? github : "#"}
            />
          )}

          {linkedin && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Linkedin"
              link={linkedin ? linkedin : "#"}
            />
          )}

          {instagram && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Instagram"
              link={instagram ? instagram : "#"}
            />
          )}

          {youtube && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Youtube"
              link={youtube ? youtube : "#"}
            />
          )}

          {gmail && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Gmail"
              link={gmail ? gmail : "#"}
            />
          )}

          {facebook && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Facebook"
              link={facebook ? facebook : "#"}
            />
          )}
          {discord && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Discord"
              link={discord ? discord : "#"}
            />
          )}
          {snapchat && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Snapchat"
              link={snapchat ? snapchat : "#"}
            />
          )}
          {whatsapp && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Whatsapp"
              link={whatsapp ? whatsapp : "#"}
            />
          )}

          {tiktok && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Tiktok"
              link={tiktok ? tiktok : "#"}
            />
          )}

          {telegram && (
            <SocialLink
              userTheme={userTheme && { backgroundColor: userTheme.c4 }}
              title="Telegram"
              link={telegram ? telegram : "#"}
            />
          )}
        </div>
      </div>

      {!minted && router.pathname.includes("/dashboard") && (
        <div className="w-full flex items-center mt-3 gap-3 justify-between">
          <Button className="w-1/2" onClick={handleEdit} variant="warning">
            Edit
          </Button>
          <Button
            className="w-1/2"
            loading={loading}
            onClick={() => (handleDelete ? handleDelete(username) : () => {})}
            variant="danger"
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Card;
