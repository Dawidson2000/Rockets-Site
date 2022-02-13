import { FC } from 'react';
import styled from 'styled-components';
import CardHelper from '../components/UI/Card';
import { Colors } from '../styledHelpers/Colors';


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
    </HomeW>
  );
};

export default Events;
