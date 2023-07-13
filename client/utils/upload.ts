import toast from "react-hot-toast";

export const upload = async (
  event: any,
  supabase: any,
  uid: string,
  bucketName: string
) => {
  try {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = event.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${uid}.${fileExt}`;
    const filePath = `${fileName}`;

    let { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, { upsert: true });

    if (error) {
      throw error;
    }

    return filePath;
  } catch (error) {
    toast("Error uploading avatar!");
    console.log(error);
  }
};
