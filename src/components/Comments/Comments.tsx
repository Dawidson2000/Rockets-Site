import { FC, useEffect, useState } from 'react';
import { getComments } from './api';
import Comment, { IComment } from './Comment';
import CommentForm from './CommentForm';
import { createComment, deleteComment as removeCommentApi, updateComment as updateCommentApi } from './api';
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
    const rootComments = comments.filter(comment => comment.parentId === null);

    const getReplies = (commentId: string) => {
        return comments.filter(comment => comment.parentId === commentId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };

    const addComment = (text: string, parentId?: any) => {
        createComment(text, parentId).then(comment =>
            setComments([comment, ...comments]));
            setActiveComment(null);
    };

    const deleteComment = (commentId: string) => {
        removeCommentApi(commentId).then(()=>{
            const updatedComments = comments.filter(
                comment => comment.id != commentId
            );
            setComments(updatedComments);
        });
    };

    const updateComment = (text: string, commentId: string) => {
        updateCommentApi(text, commentId).then(()=>{
            const updatedComments = comments.map(comment => {
                if(comment.id === commentId){
                    return {...comment, body: text};
                }
                return comment;
            })
            setComments(updatedComments);
            setActiveComment(null);
        })
    };

    useEffect(()=>{
        getComments().then(data => {
            setComments(data)
        });
    }, [])
    
    return (
        <CommentWrapper>
            <h2>Comments</h2>
            <h4>Wtite Comment</h4>
            <CommentForm 
                submitLabel='Write' 
                submitHandler={addComment} 
                initialText='' 
                hasCancelButton={false}
                cancelHandler={()=>{}}
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
    ) 
};
 
export default Comments;