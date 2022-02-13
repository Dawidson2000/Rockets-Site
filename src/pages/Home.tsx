import { FC } from 'react';
import styled from 'styled-components';
import Comments from '../components/Comments/Comments';
import { Colors } from '../styledHelpers/Colors';

const HomeW = styled.div`
 	max-width: 1200px;
	margin-top: 130px;
	margin-right: auto;
	margin-left: auto;
	background-color: ${Colors.cardBackground};
	color: white;
	box-sizing: border-box;
	padding: 20px;
`;

const Home: FC = () => {

	return (
    <HomeW>
        <Comments currentUserId='2'/>
    </HomeW>
  );
};

export default Home;
