import axios from "axios";

const postApi = axios.create({
  baseURL: "http://localhost:8899/api/post",
});

const addToken = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getPostById = (postId, token) =>
  postApi.get(`/${postId}`, addToken(token));

// สำหรับสร้าง ลบ อัพเดท
export const createPost = (body, token) =>
  postApi.post("/", body, addToken(token));

export const deletePost = (postId, token) =>
  postApi.delete(`/${postId}`, addToken(token));

export const deleteImage = (publicId) =>
  postApi.delete(`/imageCloud/${publicId}`);

export const updatePost = (postId, body, token) =>
  postApi.put(`/${postId}`, body, addToken(token));

//post สำหรับฟืด
export const getAllPosts = (token) => postApi.get("/", addToken(token));

//like ใน post
export const createLike = (postId, body, token) =>
  postApi.post(`/${postId}/likes`, body, addToken(token));

export const unLike = (likeId, token) =>
  postApi.delete(`/likes/${likeId}`, addToken(token));

// สร้าง ลบ แก้ไข comment ใน post
export const createComment = (postId, body, token) =>
  postApi.post(`/${postId}/comments`, body, addToken(token));

export const deleteComment = (commentId, token) =>
  postApi.delete(`/comments/${commentId}`, addToken(token));

export const updateComment = (commentId, body, token) =>
  postApi.put(`/comments/${commentId}`, body, addToken(token));

//เรียก comment ขึ้น post
export const getCommentsByPostId = (postId, token) => {
  postApi.get(`/${postId}/comments`, addToken(token));
};

//like comment
export const createCommentLike = (commentId, body, token) =>
  postApi.post(`/comments/${commentId}/likes`, body, addToken(token));

export const unCommentLike = (commentId, token) =>
  postApi.delete(`/comments/likes/${commentId}`, addToken(token));

//สร้าง book marks
export const createBookmarks = (body, token) =>
  postApi.post("/bookmarks", body, addToken(token));

export const unBookmarks = (bookmarkId, token) =>
  postApi.delete(`/bookmarks/${bookmarkId}`, addToken(token));
