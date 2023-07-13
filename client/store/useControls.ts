import { create } from "zustand";
import { LinkType } from "../flow/types";
import { DEFAULT_AVATAR, DEFAULT_COVER } from "../components/Builder/Card";

// text

type Store = {
  //For Details
  displayName: string;
  username: string;
  title: string;
  avatar: string;
  cover: string;
  bio: string;
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
  model: boolean;
  otherLinks: LinkType[];
  //For Themes
  avatarStyle: string;
  userBgColor: string;
  userTheme: string;
  colorTheme_DATA: string[];
  backgroundColors_DATA: Array<string>;
  authModal: boolean;
};
type Actions = {
  //For Details
  setDisplayName: (displayName: Store["displayName"]) => void;
  setUserName: (username: Store["username"]) => void;
  setTitle: (title: Store["title"]) => void;
  setAvatar: (avatar: Store["avatar"]) => void;
  setBio: (bio: Store["bio"]) => void;
  setTwitter: (twitter: Store["twitter"]) => void;
  setGithub: (github: Store["github"]) => void;
  setLinkedin: (linkedin: Store["linkedin"]) => void;
  setInstagram: (instagram: Store["instagram"]) => void;
  setYoutube: (youtube: Store["youtube"]) => void;
  setFacebook: (facebook: Store["facebook"]) => void;
  setDiscord: (discord: Store["discord"]) => void;
  setSnapchat: (snapchat: Store["snapchat"]) => void;
  setWhatsapp: (whatsapp: Store["whatsapp"]) => void;
  setTiktok: (tiktok: Store["tiktok"]) => void;
  setTelegram: (telegram: Store["telegram"]) => void;
  setGmail: (gmail: Store["gmail"]) => void;
  setModel: (model: Store["model"]) => void;
  setCover: (model: Store["cover"]) => void;
  //For Themes
  setAvatarStyle: (displayName: Store["avatarStyle"]) => void;
  setUserBgColor: (userBgColor: Store["userBgColor"]) => void;
  setUserTheme: (userBgColor: Store["userTheme"]) => void;
  setAuthModal: (state: Store["authModal"]) => void;
  addOtherLink: (data: LinkType) => void;
  deleteOtherLink: (data: LinkType) => void;
};

export const useControls = create<Store & Actions>((set): any => ({
  //For Details
  displayName: "",
  username: "",
  title: "",
  avatar: DEFAULT_AVATAR,
  cover: DEFAULT_COVER,
  bio: "",
  github: "",
  linkedin: "",
  instagram: "",
  youtube: "",
  gmail: "",
  facebook: "",
  discord: "",
  snapchat: "",
  whatsapp: "",
  tiktok: "",
  telegram: "",
  model: false,
  otherLinks: [],
  //For Themes
  avatarStyle: "rounded-lg",
  userBgColor: "linear-gradient(to top, #98FDB4 0%, #00CD8C 100%)",
  userTheme: "#e5e7eb #9ca3af #374151 #1f2937",
  colorTheme_DATA: [
    "#e5e5e5 #a3a3a3 #1f2937 #111827",
    "#E2D6FF #CCBBFF #24273F #1B1C30",
    "#e5e7eb #9ca3af #374151 #1f2937",
    "#ffffff #a3a3a3 #1C1C1C #000000",
    "#E5B8F4 #B854C4 #2D033B #810CA8",
    "#01E68B #008578 #002024 #013841",
    "#FFFFFF #CCBBFF #7B55EA #1F0078",
    "#000200 #AE7B5F #F2D6BE #F6F0EB",
    "#000200 #D3B3B6 #FFFFFF #F6F6F6",
    "#FFD6A5 #FFB874 #FF7F3F #FF4A00",
    "#A5FFD6 #74FFB8 #3FFF7F #00FF4A",
    "#A5D6FF #74B8FF #3F7FFF #004AFF",
    "#FFA5D6 #FF74B8 #FF3F7F #FF004A",
    "#D6A5FF #B874FF #7F3FFF #4A00FF",
    "#A5FFA5 #74FF74 #3FFF3F #00FF00",
    "#FFA5A5 #FF7474 #FF3F3F #FF0000",
    "#D6FFA5 #B8FF74 #7FFF3F #4AFF00",
    "#A5A5FF #7474FF #3F3FFF #0000FF",
    "#FFD6D6 #FFB8B8 #FF7F7F #FF4A4A",
    "#D6FFD6 #B8FFB8 #7FFF7F #4AFF4A",
    "#D6D6FF #B8B8FF #7F7FFF #4A4AFF",
    "#FFA5A5 #FF7474 #FF3F3F #FF0000",
    "#A5A5FF #7474FF #3F3FFF #0000FF",
    "#A5FFA5 #74FF74 #3FFF3F #00FF00",
    "#FFA5D6 #FF74B8 #FF3F7F #FF004A",
    "#D6A5FF #B874FF #7F3FFF #4A00FF",
    "#A5D6FF #74B8FF #3F7FFF #004AFF",
    "#A5FFD6 #74FFB8 #3FFF7F #00FF4A",
    "#FFD6A5 #FFB874 #FF7F3F #FF4A00",
  ],
  backgroundColors_DATA: [
	"linear-gradient(to top, #FFD080 0%, #FFA94D 100%)",
"linear-gradient(to top, #FFE2A8 0%, #FFC05F 100%)",
"linear-gradient(to top, #C6E5FF 0%, #77BDFE 100%)",
"linear-gradient(to top, #FFB3F0 0%, #FF82D6 100%)",
"linear-gradient(to top, #FFB27A 0%, #FF7400 100%)",
"linear-gradient(to top, #A3FFE6 0%, #6DF5C3 100%)",
"linear-gradient(to top, #D4C6FF 0%, #A480FF 100%)",
"linear-gradient(to top, #FDECB2 0%, #F7D36D 100%)",
"linear-gradient(to top, #FFF3C5 0%, #FFD461 100%)",
"linear-gradient(to top, #C0FFBC 0%, #66FF7F 100%)",
"linear-gradient(to top, #B7F4FF 0%, #6AC7FF 100%)",
"linear-gradient(to top, #FFD3B6 0%, #FFA66C 100%)",
"linear-gradient(to top, #D3FFD3 0%, #8BFF8B 100%)",
"linear-gradient(to top, #FFB6C1 0%, #FF7084 100%)",
"linear-gradient(to top, #C2E0FF 0%, #6DAEFF 100%)",
"linear-gradient(to top, #FFEED5 0%, #FFC289 100%)",
"linear-gradient(to top, #E0E3FF 0%, #A5ACFF 100%)",
"linear-gradient(to top, #FFECE6 0%, #FFA98C 100%)",
"linear-gradient(to top, #E2B2FF 0%, #C358FF 100%)",
"linear-gradient(to top, #FFDAC1 0%, #FFA178 100%)",
    "linear-gradient(to top, #96fbc4 0%, #f9f586 100%)",
    "linear-gradient(to top, #dfe9f3 0%, white 100%)",
    "linear-gradient(to top, #98FDB4 0%, #00CD8C 100%)",
    "linear-gradient(to top, #ffd6ff 0%, #c8b6ff 100%)",
    "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)",
    "linear-gradient(-225deg, #AC32E4 0%, #7918F2 48%, #4801FF 100%)",
    "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)",
    "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(to right, #111827 0%, #111827 100%)",
    "linear-gradient(to right, #171717 0%, #171717 100%)",
    "linear-gradient(to right, #a78bfa 0%, #a78bfa 100%)",
    "linear-gradient(to top, #09203f 0%, #537895 100%)",
  ],

  //For Details
  setDisplayName: (displayName: string) =>
    set(() => ({ displayName: displayName })),
  setUserName: (username: string) => set(() => ({ username: username })),
  setTitle: (title: string) => set(() => ({ title: title })),
  setAvatar: (avatar: string) => set(() => ({ avatar: avatar })),
  setBio: (bio: string) => set(() => ({ bio: bio })),
  setTwitter: (twitter: string) => set(() => ({ twitter: twitter })),
  setGithub: (github: string) => set(() => ({ github: github })),
  setLinkedin: (linkedin: string) => set(() => ({ linkedin: linkedin })),
  setInstagram: (instagram: string) => set(() => ({ instagram: instagram })),
  setYoutube: (youtube: string) => set(() => ({ youtube: youtube })),
  setGmail: (gmail: string) => set(() => ({ gmail: gmail })),
  setFacebook: (facebook: string) => set(() => ({ facebook: facebook })),
  setDiscord: (discord: string) => set(() => ({ discord: discord })),
  setSnapchat: (snapchat: string) => set(() => ({ snapchat: snapchat })),
  setWhatsapp: (whatsapp: string) => set(() => ({ whatsapp: whatsapp })),
  setTiktok: (tiktok: string) => set(() => ({ tiktok: tiktok })),
  setTelegram: (telegram: string) => set(() => ({ telegram: telegram })),
  setModel: (model: boolean) => set(() => ({ model: !model })),
  addOtherLink: (data: LinkType) => {
    set((state) => ({
      otherLinks: [...state.otherLinks, data],
    }));
  },
  setCover: (cover: string) => set(() => ({ cover: cover })),
  deleteOtherLink: (data: LinkType) => {
    set((state) => ({
      otherLinks: [...state.otherLinks.filter((e) => e.title != data.title)],
    }));
  },
  //For Themes
  setAvatarStyle: (avatarStyle: string) =>
    set(() => ({ avatarStyle: avatarStyle })),
  setUserBgColor: (userBgColor: string) =>
    set(() => ({ userBgColor: userBgColor })),
  setUserTheme: (userTheme: string) => set(() => ({ userTheme: userTheme })),
  authModal: false,
  setAuthModal: (state: boolean) => set(() => ({ authModal: state })),
}));
