import React from "react";
import { Link, useParams } from "react-router";
import CreatePostButton from "../components/CreatePostButton";
import useUserStore from "../stores/userStore";
import { useEffect } from "react";
import usePostStore from "../stores/postStore";
import { useState } from "react";
import { toast } from "react-toastify";
import PostActions from "../components/PostAction";
// import PostActions from "../components/PostAction";

function PostPage() {
  const { postId } = useParams();
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const getPostById = usePostStore((state) => state.getPostById);

  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(getPostById);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await getPostById(postId, token);
        setPostDetail(response.data.post);
      } catch (error) {
        console.error("Failed to fetch post detail:", error);
        toast.error("Failed to load post details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, []);

  const isOwner = postDetail && postDetail.userId === user?.id;

  if (loading) return 0;
  if (!postDetail) return <div>Post not found.</div>;
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div
        className="
        w-full max-w-3xl mx-auto
        bg-white shadow-lg rounded-lg
        p-6 md:p-8 space-y-6
      "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-5">
          <h1 className="text-5xl font-extrabold text-gray-800">
            {postDetail?.title}
          </h1>
          {/* Like/Saved Buttons */}
          {isOwner && (
            <div className="flex gap-2">
              <PostActions postDetail={postDetail} />
            </div>
          )}
        </div>

        {/*  User Info & Follow Button */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={postDetail.user?.profileImage}
              alt={postDetail.user?.firstName}
              className="w-10 h-10   rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-800">
                {postDetail.user.firstName}
              </p>
              <span className="ml-1 text-gray-400">
                {new Date(postDetail.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full transition-colors">
            Follow
          </button>
        </div>

        {/*  Restaurant Name*/}
        <div className="flex items-center justify-between  pb-4 mb-4">
          <h2 className="text-4xl font-bold text-gray-700">
            {postDetail?.restaurantName}
          </h2>
        </div>

        {/*  Restaurant Image */}
        <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
          <img
            src={postDetail?.postImage}
            alt="Restaurant"
            className="w-full h-full object-cover"
          />
        </div>

        {/*  Description */}
        <div className="text-gray-700 leading-relaxed text-base  pb-4 mb-4">
          <p>{postDetail?.description}</p>
        </div>

        {/* Other Comments ค่อยทำ*/}
        {/* <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Comments (5)</h3>{" "}
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <img
                src="https://via.placeholder.com/30"
                alt="User"
                className="w-7 h-7 rounded-full"
              />
              <p className="font-semibold text-gray-700 text-sm">
                CommenterName
              </p>
              <p className="text-xs text-gray-500">5 mins ago</p>
            </div>
            <p className="text-gray-700 text-sm">
              This place looks amazing! I want to visit soon.
            </p>
            <button className="text-blue-500 text-xs mt-1 hover:underline">
              Reply
            </button>
          </div>
        </div> */}

        {/* Comment Input ค่อยทำ*/}
        <div className="mt-6 pt-4 border-t">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            Leave a Comment
          </h3>
          <textarea
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-y"
            rows="3"
            placeholder="Write your comment here..."
          ></textarea>
          <div className="flex justify-end mt-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-5 rounded-lg transition-colors">
              Post Comment
            </button>
          </div>
        </div>
      </div>
      <CreatePostButton />
    </div>
  );
}

export default PostPage;
