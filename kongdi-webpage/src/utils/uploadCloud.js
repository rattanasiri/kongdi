import axios from "axios";

export default async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cc21-upload");

    const resp = await axios.post(
      "https://api.cloudinary.com/v1_1/dcus2jxpx/image/upload",
      formData
    );
    console.log("uploadCloud : resp", resp);
    return resp.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};
