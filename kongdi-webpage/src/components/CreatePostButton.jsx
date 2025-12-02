import React from "react";
import { Link, useNavigate } from "react-router";
import useUserStore from "../stores/userStore";

function CreatePostButton() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const hdlCreatePostButton = () => {
    if (user) {
      navigate("/createPost");
    } else {
      navigate("/login");
    }
  };

  return (
    <button
      className="fixed bottom-8 right-8  bg-orange-600  hover:bg-orange-700  text-white font-bold 
            py-10 px-14 rounded-full shadow-lg z-50 transition duration-300
            "
      onClick={hdlCreatePostButton}
    >
      CreatePost
    </button>
  );
}

export default CreatePostButton;
