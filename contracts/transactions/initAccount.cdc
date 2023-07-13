import LinkLoom from 0x631e88ae7f1d7c20
import NonFungibleToken from 0x631e88ae7f1d7c20

transaction() {
    prepare(account: AuthAccount) {
      let cap = account.getCapability<&LinkLoom.Collection{NonFungibleToken.CollectionPublic,LinkLoom.CollectionPublic}>(LinkLoom.CollectionPublicPath).check()
      if cap {
        return 
      }
      account.save<@NonFungibleToken.Collection>(<- LinkLoom.createEmptyCollection(),to: LinkLoom.CollectionStoragePath)
      account.link<&LinkLoom.Collection{NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, LinkLoom.CollectionPublic}>(LinkLoom.CollectionPublicPath, target: LinkLoom.CollectionStoragePath)
      account.link<&LinkLoom.Collection>(/private/LinkLoomCollection, target: LinkLoom.CollectionStoragePath)
    }

    execute {}
}
