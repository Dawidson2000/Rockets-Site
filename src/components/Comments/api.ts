import CommentType from '../../modals/comment-type';
import commentsRef, { database } from '../../util/firebase';
import { push, onValue, remove, ref, update, child } from 'firebase/database';

export const getAllCommentsFirebase = async () => {
	// const commentsList: CommentType[] = [];

	// onValue(commentsRef, (snapshot) => {
	// 	const comments = snapshot.val();

	// 	for (const key in comments) {
	// 		commentsList.push({ ...comments[key], id: key });
	// 	}
	// });

	// return commentsList;
  const response = await fetch('https://rockets-site-default-rtdb.firebaseio.com/comments.json')

  if(!response.ok){
    throw new Error("Could not get all comments")
  };

  const data: CommentType[] = await response.json();

  const comments = [] as CommentType[];

  for(const key in data){
    const commentObj = {
      ...data[key],
      id: key,
    };
    comments.push(commentObj);
  }
  return comments;
};

export const addCommentFirebase = async (text: any, parentId = '0') => {
	console.log('add', 'add');
	const newCommentKey = push(child(ref(database), 'comments')).key;

	const newComment = {
		id: newCommentKey,
		body: text,
		parentId,
		userId: '2',
		username: 'Jack',
		createdAt: new Date().toISOString(),
	};

	update(ref(database, 'comments/' + newCommentKey), newComment);

	return newComment;
};

export const updateCommentFirebase = async (
	comment: CommentType,
	text: string
) => {
	update(ref(database, 'comments/' + comment.id), {
		...comment,
		body: text,
	});
};

export const deleteCommentFirebase = async (commentId: string) => {
	remove(ref(database, 'comments/' + commentId));
	return {};
};
