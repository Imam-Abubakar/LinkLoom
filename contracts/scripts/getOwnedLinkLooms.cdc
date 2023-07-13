import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20


pub fun main():[LinkLoom.LinkInfo] {
    let collectionRef = getAccount(0x631e88ae7f1d7c20).getCapability(LinkLoom.CollectionPublicPath).borrow<&LinkLoom.Collection{LinkLoom.CollectionPublic,NonFungibleToken.CollectionPublic}>() ?? panic("Could not borrow capability from the public collection")
    let infos: [LinkLoom.LinkInfo] = []
    for id in collectionRef.getIDs() {
      let nft = collectionRef.borrowLinkLoomNFT(id: id)
      infos.append(nft.getLinkInfo())
    }
    return infos
  }

