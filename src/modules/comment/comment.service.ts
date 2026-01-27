import { error } from "node:console";
import { prisma } from "../../lib/prisma";

const createComment = async (payload: {
  content: string;
  postId: string;
  authorId: string;
  parentId?: string;
}) => {
  await prisma.post.findUniqueOrThrow({
    where: {
      id: payload.postId,
    },
  });
  if (payload.parentId) {
    await prisma.comment.findUniqueOrThrow({
      where: {
        id: payload.parentId,
      },
    });
  }
  const result = await prisma.comment.create({
    data: payload,
  });
  return result;
};

const getCommentById = async (id: string) => {
  return await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      post: {
        select: {
          id: true,
          views: true,
          title: true,
        },
      },
    },
  });
};

const getCommentsByAuthorId = async (id: string) => {
  return await prisma.comment.findMany({
    where: {
      authorId: id,
    },
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
};

const deleteComment = async (authorId: string, commentId: string) => {
  const commentData = await prisma.comment.findFirst({
    where: {
      authorId,
      id: commentId,
    },
  });
  if (!commentData) {
    throw error("Input valid data");
  }
  return await prisma.comment.delete({
    where: {
      id: commentData.id,
    },
  });
};
export const commentService = {
  createComment,
  getCommentsByAuthorId,
  deleteComment,
  getCommentById,
};
