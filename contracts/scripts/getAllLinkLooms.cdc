import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20



pub fun main(): [LinkLoom.LinkInfo]{
  let allOwners = LinkLoom.getAllOwner()
  let infos: [LinkLoom.LinkInfo] = []

  for domainName in allOwners.keys {
      let collectionRef = getAccount(allOwners[domainName]!).getCapability(LinkLoom.CollectionPublicPath).borrow<&LinkLoom.Collection{LinkLoom.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
      let id = LinkLoom.domainNameToIDs[domainName] ?? panic("Id not found")
      if id != nil {
        let domain = collectionRef.borrowLinkLoomNFT(id: id)
        let linkInfo = domain.getLinkInfo()
        infos.append(linkInfo)
      }
  }
  
  return infos
}
 