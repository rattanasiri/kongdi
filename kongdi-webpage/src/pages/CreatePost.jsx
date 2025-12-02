import React from "react";
import ProvinceList from "../components/ProvinceList";
import CategoryList from "../components/CategoryList";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import UploadImage from "../components/UploadImage";
import { toast } from "react-toastify";
import uploadCloud from "../utils/uploadCloud";

function CreatePost() {
  const token = useUserStore((state) => state.token);
  const createPost = usePostStore((state) => state.createPost);
  const navigate = useNavigate();

  //ไฟล์
  const [file, setFile] = useState([null]);
  const [loading, setLoading] = useState(false);
  // console.log("file CreatePost", file);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({});

  const hdlCreatePost = async (data) => {
    let imageUrl = "";
    setLoading(true);

    try {
      if (file) {
        console.log("file file", file);
        imageUrl = await uploadCloud(file[0]);
        console.log("imageUrl", imageUrl);
        setLoading(true);
      }
      const body = {
        ...data,
        postImage: imageUrl,
      };
      const resp = await createPost(body, token);
      toast.success(resp?.data?.message);
      reset();
      setFile(null);
      navigate(`/`);
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.error?.message || err.message;
      toast.error(errMsg);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen pt-12 pb-12 bg-gray-50">
      <div className="w-full max-w-2xl bg-white p-8 md:p-10 shadow-xl rounded-lg border border-gray-200">
        <form className="space-y-6" onSubmit={handleSubmit(hdlCreatePost)}>
          <div>
            <div className="text-4xl font-extrabold text-gray-800 mb-2">
              Create Post
            </div>
          </div>
          {/* ชื่อร้าน */}
          <div>
            <label
              htmlFor="restaurantName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Restaurant Name
            </label>
            <input
              id="restaurantName"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-md"
              placeholder="Enter Restaurant Name"
              {...register("restaurantName")}
            />
          </div>
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 p-2.5 rounded-md"
              placeholder="Enter Title"
              {...register("title")}
            />
          </div>
          {/* เพิ่มรูปภาพ */}
          <UploadImage file={file[0]} setFile={setFile} />
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descriptions
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full border border-gray-300 p-2.5 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter detailed description"
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CategoryList register={register} errors={errors} />
            </div>
            <div>
              <ProvinceList register={register} errors={errors} />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-amber-500 hover:bg-orange-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md transition duration-200 w-full"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
