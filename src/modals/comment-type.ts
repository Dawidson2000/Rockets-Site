type CommentType = {
  id: any,
  body: string,
  username: string,
  userId: string,
  parentId: string | null,
  createdAt: string,
}

export type ChangeCommentType = {
  type: string,
  id: string
}

export default CommentType;