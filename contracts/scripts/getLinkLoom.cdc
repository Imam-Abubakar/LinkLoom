import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20


pub fun main(domainName:String): LinkLoom.LinkInfo? {
    let account = LinkLoom.owners[domainName]!
    let id = LinkLoom.domainNameToIDs[domainName]!
    let collectionRef = getAccount(account).getCapability(LinkLoom.CollectionPublicPath).borrow<&LinkLoom.Collection{LinkLoom.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    if id != nil {
      let nft = collectionRef.borrowLinkLoomNFT(id: id)
      let linkInfo = nft.getLinkInfo()
      return linkInfo
    }
    return nil
  }
  
 