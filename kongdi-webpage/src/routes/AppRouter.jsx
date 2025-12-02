import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterForm from "../pages/RegisterForm";
import useUserStore from "../stores/userStore";
import UserLayout from "../layouts/UserLayout";
import CreatePost from "../pages/CreatePost";
import PostPage from "../pages/PostPage";
import HomePage from "../pages/HomePage";
import Mypage from "../pages/Mypage";

const guestRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "post/:postId", element: <PostPage /> },
      { path: "createPost", element: <CreatePost /> },
      { path: "otherPage", element: <p>OtherPage</p> }, //ทุกคนเหนหมด
      { path: "followPage", element: <p>FollowPage</p> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
  { path: "login", element: <LoginPage /> },
  { path: "register", element: <RegisterForm /> },
]);

const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "post/:postId", element: <PostPage /> },
      { path: "createPost", element: <CreatePost /> },
      { path: "otherPage", element: <p>OtherPage</p> },
      { path: "followPage", element: <p>FollowPage</p> },
      { path: "myPage", element: <Mypage /> },
      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function AppRouter() {
  const user = useUserStore((state) => state.user);
  const finalRouter = user ? userRouter : guestRouter;
  return <RouterProvider key={user?.id} router={finalRouter} />;
}

export default AppRouter;
