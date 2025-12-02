import React from "react";
import { useNavigate } from "react-router";

function PostContainer({ post }) {
  const navigate = useNavigate();
  const { id, postImage, title, restaurantName, user, createdAt } = post;
  const hdlNavigate = () => {
    navigate(`/post/${id}`);
  };
  return (
    <div
      className="card card-compact bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
      onClick={hdlNavigate}
    >
      {postImage && (
        <figure className="h-48 w-full">
          <img
            src={postImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </figure>
      )}

      <div className="card-body p-3">
        <h2 className="card-title text-base font-semibold truncate">{title}</h2>
        <p className="text-s font-bold text-orange-600 mb-2 truncate">
          {restaurantName}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <img
              src={user?.profileImage}
              alt={user?.firstName}
              className="w-10 h-10   rounded-full object-cover"
            />
            <span className="font-medium text-gray-700">{user?.firstName}</span>
            <span className="ml-1 text-gray-400">
              {new Date(createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostContainer;
