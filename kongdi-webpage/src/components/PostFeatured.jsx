import React from "react";
import { useNavigate } from "react-router";

function PostFeatured({ post }) {
  const navigate = useNavigate();
  if (!post) return null;

  const { id, title, postImage, restaurantName, description } = post;

  return (
    <div
      className="w-290    h-[400px] bg-white shadow-xl rounded-xl overflow-hidden cursor-pointer  flex"
      onClick={() => navigate(`/post/${id}`)}
    >
      <img src={postImage} alt={title} className="w-full h-full object-cover" />

      <div className="p-4">
        <h2 className="text-4xl font-bold mb-2">{title}</h2>
        <p className="text-s font-bold text-orange-600 mb-2 truncate">
          {restaurantName}
        </p>
        <p className="text-gray-600">{description}</p>

        <p className="text-sm text-orange-500 mt-3 font-medium">
          ⭐ NEWEST Review !! ⭐
        </p>
      </div>
    </div>
  );
}

export default PostFeatured;
