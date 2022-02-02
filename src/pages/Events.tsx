import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments/Comments';
import CardHelper from '../components/UI/Card';
import { Colors } from '../styledHelpers/Colors';
import { getAllCommentsFirebase } from '../components/Comments/api';
import CommentType from '../modals/comment-type';

const HomeW = styled(CardHelper)`
	max-width: 900px;
	margin-top: 130px;
	margin-right: auto;
	margin-left: auto;
	background-color: ${Colors.cardBackground};
	color: white;
	box-sizing: border-box;
	padding: 20px;
`;

const Events: FC = () => {
	return (
    <HomeW>
      <Comments currentUserId='2'/>
    </HomeW>
  );
};

export default Events;
