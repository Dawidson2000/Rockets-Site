import CommentType from "../../modals/comment-type";

export const getComments = async () => {
    return [
      {
        id: "1",
        body: "First comment",
        username: "John",
        userId: "1",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "2",
        body: "Second comment",
        username: "Mike",
        userId: "2",
        parentId: null,
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "3",
        body: "First comment first child",
        username: "Jack",
        userId: "3",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "4",
        body: "First comment second child",
        username: "Jack",
        userId: "3",
        parentId: "1",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
      {
        id: "5",
        body: "Second comment second child",
        username: "Jack",
        userId: "3",
        parentId: "2",
        createdAt: "2021-08-16T23:00:33.010+02:00",
      },
    ];
  };

  export const getAllCommentsFirebase = async() => {
    const response = await fetch('https://rockets-site-default-rtdb.firebaseio.com/comments.json')

    if(!response.ok){
      throw new Error("Could not get all comments")
    };

    const data: CommentType[] = await response.json();

    const comments = [] as CommentType[];

    for(const key in data){
      const commentObj = {
        ...data[key],
        //id: key,
      };
      comments.push(commentObj);
    }
    console.log('Firebase', comments);
    return comments;
  };
  
  export const createComment = async (text: any, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString(),
    };
  };

  export const addCommentFirebase = async (text: any, parentId = '0') => {
    const response = await fetch('https://rockets-site-default-rtdb.firebaseio.com/comments.json', {
      method: 'POST',
      body: JSON.stringify({
        id: Math.random().toString(36).substr(2, 9),
        body: text,
        parentId,
        userId: "1",
        username: "John",
        createdAt: new Date().toISOString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Could not add comment.');
    }

    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString(),
    };
  };
 
  export const updateComment = async (text: string, commentId: string) => {
    return { text };
  };
  
  export const updateCommentFirebase = async (text: string, commentId: string) => {
    console.log(commentId);
    const response = await fetch('https://rockets-site-default-rtdb.firebaseio.com/comments/commentId.json')
    
    if(!response.ok){
      throw new Error("Could not get comment")
    };

    const data: CommentType = await response.json();
    console.log(data);
    data.body = text;
    data.createdAt = new Date().toISOString();

    const updatedComment: CommentType = {
      ...data
    };

    const responsePost = await fetch('https://rockets-site-default-rtdb.firebaseio.com/comments.json', {
      method: 'POST',
      body: JSON.stringify(updatedComment),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!responsePost.ok) {
      throw new Error('Could not add comment.');
    }
  };
  
  export const deleteComment = async (commentId: string) => {
    return {};
  };