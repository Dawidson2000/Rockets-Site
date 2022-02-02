import { FC, useEffect, useState } from 'react';
import { addCommentFirebase, deleteCommentFirebase, updateCommentFirebase } from './api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getAllCommentsFirebase } from './api';
import styled from 'styled-components';
import CommentType, { ChangeCommentType } from '../../modals/comment-type';

const CommentWrapper = styled.div`
	& > h4 {
		text-align: left;
		width: 100%;
	}
`;

export interface IComments {
	currentUserId: string;
}

const Comments: FC<IComments> = (props) => {
	const [comments, setComments] = useState<CommentType[]>([]);
	const [activeComment, setActiveComment] = useState<null | ChangeCommentType>(null);

	const rootComments = comments.filter((comment) => comment.parentId === '0')
  .sort( (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

	const getReplies = (commentId: string) => {
		return comments
			.filter((comment) => comment.parentId === commentId)
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
	};

	const addComment = (text: string, parentId?: any) => {
    const existedComments = [...comments];
		
    addCommentFirebase(text, parentId).then((comment) =>
			setComments([comment, ...existedComments])
		);
		setActiveComment(null);
	};

	const deleteComment = (commentId: string) => {
    const existedComments = [...comments];
		
    deleteCommentFirebase(commentId).then(() => {
			const updatedComments = existedComments.filter(
				(comment) => comment.id != commentId
			);
			setComments(updatedComments);
		});
	};

	const updateComment = (updatingComment: CommentType, text: string) => {
    const existedComments = [...comments];
		
    updateCommentFirebase(updatingComment, text).then(() => {
			const updatedComments = existedComments.map((existedComment) => {
				if (existedComment.id === updatingComment.id) {
					return { ...existedComment, body: text };
				}
				return existedComment;
			});
			setComments(updatedComments);
			setActiveComment(null);
		});
	};

  const fetchData = async() => {
    const data = await getAllCommentsFirebase();
    setComments(data);
  };

	useEffect(() => {
    fetchData();
	}, []);

	return (
		<CommentWrapper>
			<h2>Comments</h2>
			<h4>Wtite Comment</h4>
			<CommentForm
				submitLabel='Write'
				submitHandler={addComment}
				initialText=''
				hasCancelButton={false}
				cancelHandler={() => {}}
			/>
			{rootComments.map((rootComment: any) => (
				<Comment
					key={rootComment.id}
					comment={rootComment}
					replies={getReplies(rootComment.id)}
					currentUserId={props.currentUserId}
					deleteComment={deleteComment}
					activeComment={activeComment}
					setActiveComment={setActiveComment}
					parentId={null}
					addComment={addComment}
					updateComment={updateComment}
					isRepliesButtonVisible={true}
				/>
			))}
		</CommentWrapper>
	);
};

export default Comments;
