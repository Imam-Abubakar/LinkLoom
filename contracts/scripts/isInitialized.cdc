import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account:Address):Bool {
 let cap = getAccount(account).getCapability<&LinkLoom.Collection{NonFungibleToken.CollectionPublic}>(LinkLoom.CollectionPublicPath).check()
  return cap
}
 