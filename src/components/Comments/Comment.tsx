import { FC, useState } from 'react';
import styled from 'styled-components';
import CommentType from '../../modals/comment-type';
import { ChangeCommentType } from '../../modals/comment-type';
import { media } from '../../styledHelpers/Breakpoints';
import CommentForm from './CommentForm';

const CommentWrapper = styled.div`
	width: 100%;
	display: flex;
	box-sizing: border-box;
	padding: 10px;
`;

const UserIcon = styled.div`
	width: 45px;
	height: 45px;
	min-width: 45px;
	min-height: 45px;
	background-color: transparent;
	border-radius: 50%;
	margin-right: 15px;
	background-image: url('../../assets/images/redLego.png');
	background-position: center;
	background-size: cover;
`;

const CommentBody = styled.div`
	width: 100%;
	overflow: hidden;
	& > p {
		margin: 0;
		text-align: left;
		word-wrap: break-word;
	}
`;

const CommentInfo = styled.div`
	font-weight: 600;
	display: flex;
	align-items: center;

	& > span {
		font-weight: 500;
		font-size: 12px;
		margin-left: 10px;
	}
`;

const Replies = styled.div`
	margin-left: 0;

	${media.tablet`
        margin-left: 20px;
    `}
`;
const CommentActions = styled.div`
	display: flex;
	width: 100%;
	gap: 1rem;
	margin: 5px 0;
`;

const CommentAction = styled.div`
	font-size: 13px;
	color: grey;
	cursor: pointer;

	&:hover {
		color: white;
	}
`;

const VisiblityButton = styled.button`
	font-size: 13px;
	color: #3892df;
	cursor: pointer;
	background-color: transparent;
	border: none;
	outline: none;

	&:hover {
		color: #9bc8ef;
	}
`;

export interface IComment {
	comment: CommentType;
	replies: CommentType[];
	currentUserId: string;
	deleteComment: (commentId: string) => void;
	activeComment: ChangeCommentType | null;
	setActiveComment: any;
	parentId: null | string;
	addComment: (text: string, parentId?: any) => void;
	updateComment: any;
	isRepliesButtonVisible: boolean;
}

const Comment: FC<IComment> = (props) => {
	const [areRepliesVisible, setAreRepliesVisible] = useState(false);
	const [repliesButtonLabel, setRepliesButtonLabel] = useState('View');
	const date = new Date(props.comment.createdAt).toLocaleString();
	const canReply = Boolean(props.currentUserId);
	const canEdit = props.currentUserId === props.comment.userId;
	const canDelete = props.currentUserId === props.comment.userId;

	const isReplying =
		props.activeComment &&
		props.activeComment.type == 'reply' &&
		props.activeComment.id === props.comment.id;

	const isEditing =
		props.activeComment &&
		props.activeComment.type == 'edit' &&
		props.activeComment.id === props.comment.id;

	const replyId = props.parentId ? props.parentId : props.comment.id;

	const deleteCommentHandler = (commentId: string) => {
		props.deleteComment(commentId);
	};

	const editCommentHandler = (changeObj: ChangeCommentType) => {
		props.setActiveComment(changeObj);
	};

	const replyCommentHandler = (changeObj: ChangeCommentType) => {
		props.setActiveComment(changeObj);
		setAreRepliesVisible(true);
		if (areRepliesVisible === false) {
			changeLabelHandler();
		}
	};

	const cancelHandler = () => {
		props.setActiveComment(null);
	};

	const repliesVisibilityHandler = () => {
		setAreRepliesVisible((prevState) => !prevState);
		changeLabelHandler();
	};

	const changeLabelHandler = () => {
		if (areRepliesVisible) {
			setRepliesButtonLabel('View');
		} else {
			setRepliesButtonLabel('Hide');
		}
	};

	return (
		<CommentWrapper>
			<UserIcon />
			<CommentBody>
				<CommentInfo>
					{props.comment.username}
					<span>{date}</span>
				</CommentInfo>
				{!isEditing ? (
					<p>{props.comment.body}</p>
				) : (
					<CommentForm
						submitLabel='Update'
						submitHandler={(text) =>
							props.updateComment(text, props.comment.id)
						}
						initialText={props.comment.body}
						hasCancelButton={true}
						cancelHandler={cancelHandler}
					/>
				)}
				<CommentActions>
					{canReply && (
						<CommentAction
							onClick={() =>
								replyCommentHandler({ id: props.comment.id, type: 'reply' })
							}
						>
							Reply
						</CommentAction>
					)}
					{canEdit && (
						<CommentAction
							onClick={() =>
								editCommentHandler({ id: props.comment.id, type: 'edit' })
							}
						>
							Edit
						</CommentAction>
					)}
					{canDelete && (
						<CommentAction
							onClick={() => deleteCommentHandler(props.comment.id)}
						>
							Delete
						</CommentAction>
					)}
					{props.isRepliesButtonVisible && props.replies.length > 0 && (
						<VisiblityButton onClick={repliesVisibilityHandler}>
							{`${repliesButtonLabel} ${props.replies.length} replies`}
						</VisiblityButton>
					)}
				</CommentActions>
				{isReplying && (
					<CommentForm
						submitLabel='Reply'
						submitHandler={(text) => props.addComment(text, replyId)}
						initialText=''
						hasCancelButton={true}
						cancelHandler={cancelHandler}
					/>
				)}
				<Replies>
					{props.replies.length > 0 &&
						areRepliesVisible &&
						props.replies.map((reply: any) => (
							<Comment
								key={reply.id}
								comment={reply}
								replies={[]}
								currentUserId={props.currentUserId}
								deleteComment={props.deleteComment}
								activeComment={props.activeComment}
								setActiveComment={props.setActiveComment}
								parentId={props.comment.id}
								addComment={props.addComment}
								updateComment={props.updateComment}
								isRepliesButtonVisible={false}
							/>
						))}
				</Replies>
			</CommentBody>
		</CommentWrapper>
	);
};

export default Comment;
