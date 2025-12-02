import { useEffect, useState } from "react";
import CreatePostButton from "../components/CreatePostButton";
import PostFeatured from "../components/PostFeatured";
import PostContainer from "../components/PostContainer";
import useUserStore from "../stores/userStore";
import usePostStore from "../stores/postStore";
function HomePage() {
  const token = useUserStore((state) => state.token);
  const { posts, getAllPosts } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) return setLoading(false);
      try {
        await getAllPosts(token, true);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  console.log("posts", posts);
  return (
    <div className="min-h-screen pt-10 pb-10 ">
      <div className="flex justify-center">
        {featuredPost && <PostFeatured post={featuredPost} />}
      </div>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="max-w-6xl mx-auto py-8 px-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {posts
                .filter((post) => post.id !== featuredPost?.id)
                .map((post) => (
                  <PostContainer key={post.id} post={post} />
                ))}
            </div>
          </div>
          <CreatePostButton />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
