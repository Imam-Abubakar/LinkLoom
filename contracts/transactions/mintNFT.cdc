import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from  0x9a0766d93b6608b7


transaction(domainName:String,displayName:String,title:String,bio:String,avatar:String,cover:String,socialLinks:{String:String},otherLinks:[{String:String}],styles:{String:String}){
  let nftReceiver: &{NonFungibleToken.CollectionPublic}
  let vault: @FungibleToken.Vault
  
  prepare(account:AuthAccount){
    self.nftReceiver = account.getCapability(LinkLoom.CollectionPublicPath).borrow<&{NonFungibleToken.CollectionPublic}>() ?? panic("Could not get receiver refernce to the NFT collection")
    let vaultRef = account.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault) ?? panic("Could not borrow Flow token vault reference")
    self.vault <- vaultRef.withdraw(amount:1.000)
  }
  
  execute {
    LinkLoom.mintLinkLoom(domainName:"rash",displayName:"x",title:"x",bio:"x",avatar:"x",cover:"x",socialLinks:{},otherLinks:[],styles:{},recipient:self.nftReceiver,feeTokens:<- self.vault) 
  }
}
 