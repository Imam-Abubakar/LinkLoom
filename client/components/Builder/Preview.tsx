import React from "react";
import { useControls } from "../../store/useControls";
import Card from "./Card";

function Preview() {
  const bg = useControls((e) => e.userBgColor);
  const {
    displayName,
    username,
    userTheme,
    title,
    bio,
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
    cover,
    avatar,
  } = useControls();

  return (
    <div
      style={{ backgroundImage: bg }}
      className="flex items-center justify-center h-full w-[100%] mx-auto md:mx-0 md:w-[48%]  ease-linear duration-150 py-16 md:sticky md:top-0"
    >
      <Card
        minted={false}
        displayName={displayName}
        theme={userTheme}
        username={username}
        bio={bio}
        title={title}
        twitter={twitter}
        github={github}
        linkedin={linkedin}
        instagram={instagram}
        youtube={youtube}
        gmail={gmail}
        facebook={facebook}
        discord={discord}
        snapchat={snapchat}
        whatsapp={whatsapp}
        tiktok={tiktok}
        telegram={telegram}
        otherLinks={otherLinks}
        avatarStyle={avatarStyle}
        avatar={avatar}
        cover={cover}
      />
    </div>
  );
}

export default Preview;
