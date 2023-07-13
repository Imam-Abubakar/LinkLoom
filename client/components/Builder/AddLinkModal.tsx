import React from "react";
//import {Modal} from "@mantine/core"
import Button from "../ui/Button";
import { ModalProps, TextInput } from "@mantine/core";
import { useState } from "react";
import { Modal, Group } from "@mantine/core";
import { useControls } from "../../store/useControls";


type Props = ModalProps;


function AddLinkModal({opened,onClose}:Props) {
  const {addOtherLink} = useControls()
  const [title, setTitle] = useState<string>("");
  const [href, sethref] = useState<string>("");

  const addNewLink = (title: string, href: string) => {
    addOtherLink({title,href});
    setTitle('')
    sethref("")
    onClose()
  };

  return (
    <>
      <Modal opened={opened}  onClose={onClose} title="Add new link" centered radius={"lg"} overlayOpacity={0.55} overlayBlur={3}>
       <div className="flex flex-col gap-4">
         <TextInput
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Eg. YouTube"
          data-autofocus
          required
          />
        <TextInput
          label="Link"
          value={href}
          onChange={(e) => sethref(e.target.value)}
          placeholder="Eg. https://www.youtube.com/c/xys"
          data-autoFocus
          required
          />
        {/* {otherLinks.map((item,idx)=> (<div>{item.title},{item.href}</div>))}*/}
        <Button className="mt-4" onClick={() => addNewLink(title, href)}>Add new link</Button>
          </div>
      </Modal>
    </>
  );
}

export default AddLinkModal;
