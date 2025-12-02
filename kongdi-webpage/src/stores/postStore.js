import { create } from "zustand";
import {
  createBookmarks,
  createComment,
  createCommentLike,
  createLike,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getCommentsByPostId,
  getPostById,
  unBookmarks,
  unCommentLike,
  unLike,
  updateComment,
  updatePost,
} from "../api/postApi";
import { use } from "react";

const usePostStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  //posts
  getAllPosts: async (token) => {
    const resp = await getAllPosts(token);
    set({ posts: resp.data.posts });
    return resp;
  },
  getPostById: async (postId, token) => {
    const resp = await getPostById(postId, token);
    return resp;
  },
  createPost: async (body, token) => {
    const resp = await createPost(body, token);
    get().getAllPosts(token);
    return resp;
  },
  deletePost: async (postId, token) => {
    const resp = await deletePost(postId, token);
    get().getAllPosts(token);
    return resp;
  },
  updatePost: async (postId, body, token) => {
    const resp = await updatePost(postId, body, token);
    get().getAllPosts(token);
    return resp;
  },

  //Like
  createLike: async (postId, body, token) => {
    const resp = await createLike(postId, body, token);
    get().getAllPosts(token);
    return resp;
  },
  unLike: async (likeId, token) => {
    const resp = await unLike(likeId, token);
    get().getAllPosts(token);
    return resp;
  },

  //comment
  createComment: async (postId, body, token) => {
    const resp = await createComment(postId, body, token);
    get().getAllPosts(token);
    return resp;
  },
  deleteComment: async (commentId, token) => {
    const resp = await deleteComment(commentId, token);
    get().getAllPosts(token);
    return resp;
  },
  updateComment: async (commentId, body, token) => {
    const resp = await updateComment(commentId, body, token);
    get().getAllPosts(token);
    return resp;
  },
  getCommentsByPostId: async (postId, token) => {
    const resp = await getCommentsByPostId(postId, token);
    return resp;
  },

  createCommentLike: async (commentId, body, token) => {
    const resp = await createCommentLike(commentId, body, token);
    get().getAllPosts(token);
    return resp;
  },
  unCommentLike: async (commentLikeId, token) => {
    const resp = await unCommentLike(commentLikeId, token);
    get().getAllPosts(token);
    return resp;
  },

  //Bookmarks
  createBookmarks: async (postId, body, token) => {
    const resp = await createBookmarks(body, token);
    get().getAllPosts(token);
    return resp;
  },
  unBookmarks: async (bookmarkId, token) => {
    const resp = await unBookmarks(bookmarkId, token);
    return resp;
  },
}));

export default usePostStore;
