import React from "react";
import useUserStore from "../stores/userStore";
import ProvinceList from "../components/ProvinceList";
import CategoryList from "../components/CategoryList";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRef } from "react";
import uploadCloud from "../utils/uploadCloud";
import { deleteImage, deletePost, updatePost } from "../api/postApi";
import { useNavigate } from "react-router";

function PostActions({ postDetail }) {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      category: postDetail.category,
      province: postDetail.province,
    },
  });

  const [editForm, setEditForm] = useState({
    restaurantName: postDetail.restaurantName,
    title: postDetail.title,
    description: postDetail.description,
    postImage: postDetail.postImage,
  });

  const fileInputRef = useRef(null);

  const hdlChangeFile = (e) => {
    console.log(e);
    const file = e.target.files[0];
    console.log("file", file);
    setEditForm((prev) => ({
      ...prev,
      preview: URL.createObjectURL(file),
      file: file,
    }));
  };

  const hdlOnChange = (e) => {
    const { id, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDelete = async () => {
    const id = postDetail.id;
    await deletePost(id, token);
    navigate("/");
  };

  const onSubmit = async (data) => {
    let sentData;

    if (editForm.file) {
      console.log("first");
      const picUrl = await uploadCloud(editForm.file);
      delete editForm.file;
      delete editForm.preview;
      console.log("imageURL", picUrl);
      sentData = {
        ...editForm,
        postImage: picUrl,
        province: data.province,
        category: data.category,
      };
    } else {
      sentData = {
        ...editForm,
        province: data.province,
        category: data.category,
      };
    }

    console.log("sent data", sentData);
    await updatePost(postDetail.id, sentData, token);
    navigate("/");
  };
  console.log("first", editForm);
  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="p-2 hover:bg-gray-200 rounded-full cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4zm0 6a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-2 shadow"
        >
          <li>
            <a
              onClick={() => document.getElementById("edit_modal").showModal()}
            >
              Edit Post
            </a>
          </li>
          <li>
            <a onClick={handleDelete} className="text-red-500">
              Delete Post
            </a>
          </li>
        </ul>
      </div>
      <dialog
        id="edit_modal"
        className="modal flex items-center justify-center"
      >
        <div className="modal-box" onClick={(e) => e.stopPropagation()}>
          <div className="w-full max-w-2xl bg-white p-5 md:p-10  rounded-lg  ">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="text-4xl font-extrabold text-gray-800 mb-2">
                  Edit Post
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
                  value={editForm.restaurantName}
                  onChange={(e) => hdlOnChange(e)}
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
                  value={editForm.title}
                  onChange={(e) => hdlOnChange(e)}
                />
              </div>
              {/* image */}
              <img
                src={editForm.preview || editForm.postImage}
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current.click();
                }}
              />
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={hdlChangeFile}
              />
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
                  value={editForm.description}
                  onChange={(e) => hdlOnChange(e)}
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
                  Update Post
                </button>
              </div>
            </form>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default PostActions;
