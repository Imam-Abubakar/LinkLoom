import * as fcl from "@onflow/fcl";

export const IS_INITIALIZED = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(account:Address):Bool {
  let capability = getAccount(account).getCapability<&FlowLink.Collection{NonFungibleToken.CollectionPublic,FlowLink.CollectionPublic}>(FlowLink.CollectionPublicPath)
  return capability.check()
}
`;

export async function checkIsInitialized(addr: string) {
  const res = await fcl.query({
    cadence: IS_INITIALIZED,
    args: (arg: any, t: any) => [arg(addr, t.Address)],
  });
  return res;
}

const GET_ALL_FLOWLINKS = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken 

pub fun main(): [FlowLink.LinkInfo]{
  let allOwners = FlowLink.getAllOwner()
  let infos: [FlowLink.LinkInfo] = []

  for domainName in allOwners.keys {
      let collectionRef = getAccount(allOwners[domainName]!).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>()!
      let id = FlowLink.domainNameToIDs[domainName] ?? panic("Id not found")
      if id != nil {
        let domain = collectionRef.borrowFlowLinkNFT(id: id)
        let linkInfo = domain.getLinkInfo()
        infos.append(linkInfo)
      }
  }
  
  return infos
}
`;

const GET_OWNED_NFTS = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken

pub fun main(account:Address):[FlowLink.LinkInfo] {
    let collectionRef = getAccount(account).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic,NonFungibleToken.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    let infos: [FlowLink.LinkInfo] = []
    for id in collectionRef.getIDs() {
      let nft = collectionRef.borrowFlowLinkNFT(id: id)
      infos.append(nft.getLinkInfo())
    }
    return infos
  }
`;

export async function getOwnedLinks(address: string) {
  return await fcl.query({
    cadence: GET_OWNED_NFTS,
    args: (arg: any, t: any) => [arg(address, t.Address)],
  });
}

export async function getAllLinkLooms() {
  return await fcl.query({
    cadence: GET_ALL_FLOWLINKS,
  });
}

const CHECK_IS_AVAILABLE = `
import FlowLink from 0xFlowLink

pub fun main(name: String): Bool {
  return FlowLink.isAvailable(domainName: name)
}
`;

export async function checkIsAvailable(name: string) {
  return await fcl.query({
    cadence: CHECK_IS_AVAILABLE,
    args: (arg: any, t: any) => [arg(name, t.String)],
  });
}

const GET_FLOWLINK_BY_DOMAIN = `
import FlowLink from 0xFlowLink
import NonFungibleToken from 0xNonFungibleToken

pub fun main(domainName:String): FlowLink.LinkInfo? {
    let account = FlowLink.owners[domainName] ?? panic("Flow Link does not exist")
    let id = FlowLink.domainNameToIDs[domainName]!
    let collectionRef = getAccount(account).getCapability(FlowLink.CollectionPublicPath).borrow<&FlowLink.Collection{FlowLink.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    if id != nil {
      let nft = collectionRef.borrowFlowLinkNFT(id: id)
      let linkInfo = nft.getLinkInfo()
      return linkInfo
    }
    return nil
}
`;

export const getLinkLoomByDomainName = async (domainName: string) => {
  return await fcl.query({
    cadence: GET_FLOWLINK_BY_DOMAIN,
    args: (arg: any, t: any) => [arg(domainName, t.String)],
  });
};
