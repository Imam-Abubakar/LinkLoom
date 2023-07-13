export type SocialLinksType = Partial<Record<'linkedin' | 'twitter' | 'youtube' | 'instagram' | 'github' | 'facebook' | string,string>>

export type LinkType = Partial<Record<'title'|'href'| string,string>>

export type FlowLinkStyleType = Partial<Record<'avatar' | 'card' | 'theme' | 'background' | string,string>>

export type FlowLinkType = {
  domainName:string 
  displayName:string 
  title:string 
  bio:string
  avatar:string
  cover:string 
  socialLinks: SocialLinksType
  otherLinks:LinkType[]
  styles:FlowLinkStyleType
}

export type FlowLinkResponse = FlowLinkType & {
  id:number 
  owner:string
}