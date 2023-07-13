import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from  0x9a0766d93b6608b7

transaction(displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String}) {
    var nft: &LinkLoom.NFT

    prepare(account: AuthAccount) {
      let collection = account.getCapability(LinkLoom.CollectionPublicPath).borrow<&LinkLoom.Collection{LinkLoom.CollectionPrivate}>() ?? panic("Could not get receiver refernce to the NFT collection")
      self.nft = collection.borrowLinkLoomPrivate(id:0)
    }

    execute {
      self.nft.setDisplayName(displayName:displayName)
      self.nft.setTitle(title: title)
      self.nft.setAvatar(avatar: avatar)
      self.nft.setBio(bio: bio)
      self.nft.setCover(cover: cover)
      self.nft.setOtherLinks(otherLinks: otherLinks)
      self.nft.setSocialLinks(socialLinks: socialLinks)
      self.nft.setStyles(styles: styles)
    }
}
 