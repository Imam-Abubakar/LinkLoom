import Link from 'next/link';
import React from 'react';
import { Tooltip } from '@mantine/core';
import { TbBrandGithub, TbBrandFacebook, TbBrandDiscord,  TbBrandSnapchat, TbBrandWhatsapp, TbBrandTiktok, TbBrandTelegram, TbBrandInstagram, TbBrandLinkedin, TbBrandTwitter, TbBrandYoutube, TbMail } from 'react-icons/tb';

type Props = {
    title?:"Twitter"|"Linkedin"|"Instagram"|"Gmail"|"Youtube"|"Github" |"Facebook" | "Discord" | "Snapchat" | "Whatsapp" | "Tiktok" | "Telegram",
    link:string,
    userTheme:any
}

const SocialLink:React.FC<Props> = ({title,link,userTheme}) => {
  const border = userTheme?'0.75px solid '+userTheme?.c2:'0.75px solid #00bbef'
  return (
    <Tooltip style={{border:border}} label={title} position='bottom'  color={userTheme&&userTheme.c2} offset={10}>
    
    <Link href={title==='Gmail'?'mailto:'+link:link} target="_blank">
        <div style={userTheme && {backgroundColor:userTheme?.c3,color:userTheme?.c1}} className={`w-full bg-gray-800/50 p-3 text-gray-50/70  rounded-full hover:brightness-125 ease-linear duration-150 active:scale-90`}>
            {title==='Twitter'&&<TbBrandTwitter size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Linkedin'&&<TbBrandLinkedin size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Instagram'&&<TbBrandInstagram size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Gmail'&&<TbMail size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Youtube'&&<TbBrandYoutube size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Github'&&<TbBrandGithub size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Facebook'&&<TbBrandFacebook size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Discord'&&<TbBrandDiscord size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Snapchat'&&<TbBrandSnapchat size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Whatsapp'&&<TbBrandWhatsapp size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Tiktok'&&<TbBrandTiktok size={20} style={{stroke:userTheme?.c1}} />}
            {title==='Telegram'&&<TbBrandTelegram size={20} style={{stroke:userTheme?.c1}} />}
        </div>
    </Link>
    </Tooltip>
  )
}

export default SocialLink