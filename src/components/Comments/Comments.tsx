import { FC, useEffect, useState } from 'react';
import {
	addCommentFirebase,
	deleteCommentFirebase,
	updateCommentFirebase,
} from './api';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getAllCommentsFirebase } from './api';
import styled from 'styled-components';
import CommentType, { ChangeCommentType } from '../../modals/comment-type';
import LoadingSpinner from '../UI/LoadingSpinner';

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
	const [activeComment, setActiveComment] = useState<null | ChangeCommentType>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);

	const rootComments = comments
		.filter((comment) => comment.parentId === '0')
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);

	const getReplies = (commentId: string) => {
		return comments
			.filter((comment) => comment.parentId === commentId)
			.sort(
				(a, b) =>
					new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
	};

	const addComment = (text: string, parentId?: any) => {
		addCommentFirebase(text, parentId).then((comment) =>
			setComments((prevComments) => [comment, ...prevComments])
		);
		setActiveComment(null);
	};

	const deleteComment = (commentId: string) => {
		deleteCommentFirebase(commentId).then(() => {
			const updatedComments = comments.filter(
				(comment) => comment.id != commentId
			);

			updatedComments.filter((comment) => {
				if (comment.parentId === commentId) {
					deleteCommentFirebase(comment.id);
					return false;
				}
				return true;
			});

			setComments(updatedComments);
		});
	};

	const updateComment = (updatingComment: CommentType, text: string) => {
		updateCommentFirebase(updatingComment, text).then(() => {
			const updatedComments = comments.map((existedComment) => {
				if (existedComment.id === updatingComment.id) {
					return { ...existedComment, body: text };
				}
				return existedComment;
			});
			setComments(updatedComments);
			setActiveComment(null);
		});
	};

	const fetchData = async () => {
		setIsLoading(true);
		const data = await getAllCommentsFirebase();
		setIsLoading(false);

		setComments(data);
	};

	useEffect(() => {
		fetchData();
	}, []);

	let content: JSX.Element | JSX.Element[] =
		rootComments.length > 0 ? (
			rootComments.map((rootComment: any) => (
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
			))
		) : (
			<p>Write first comment!</p>
		);

	if (isLoading) content = <LoadingSpinner />;

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
			{content}
		</CommentWrapper>
	);
};

export default Comments;
