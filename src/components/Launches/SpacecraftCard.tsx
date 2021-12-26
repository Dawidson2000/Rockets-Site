import { FC } from 'react';
import styled from 'styled-components';

import CardHelper from '../UI/Card';
import { Colors } from '../../styledHelpers/Colors';
import { media } from '../../styledHelpers/Breakpoints';
import { Link } from 'react-router-dom';

export interface ICard {
	img: string;
}

const Card = styled(CardHelper)<ICard>`
	color: white;
	width: 100%;
	background-color: ${Colors.cardBackground};
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: ${(props) => `url(${props.img})`};
	background-position: center;
  background-size: cover;

	& > a {
		background-color: rgb(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 15px;
    text-decoration: none;
    color: white;

    &:hover {
      background-color: rgb(0, 0, 0, 0.8);
    }
	}
`;

export interface ISpacecraftCard {
  id: number;
	name: string;
	img: string;
}
const SpacecraftCard: FC<ISpacecraftCard> = (props) => {
	return (
		<Card img={props.img}>
			<Link to={`/spacecrafts/spacecraft-details/${props.id}`}>{props.name}</Link>
		</Card>
	);
};

export default SpacecraftCard;
