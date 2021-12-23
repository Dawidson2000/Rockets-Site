import { FC } from 'react';
import styled from 'styled-components';

import CardHelper from '../UI/Card';
import LaunchDate from './LaunchDate';
import { Colors } from '../../styledHelpers/Colors';

const Card = styled(CardHelper)`
  max-width: 900px;
  width: 900px;
	background-color: ${Colors.cardBackground};
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin: 0 40px;
  margin-top: 120px;

	& > p {
		color: white;
	}

	& > h2 {
		margin-bottom: 0;
		color: white;
		font-size: 1.3rem;
		margin-right: auto;
		margin-left: 25px;
	}
`;

const Line = styled.div`
	width: 70px;
	height: 4px;
	border-radius: 2px;
	background-color: white;
	margin: 0 auto;
`;

const RocketInfo = styled.div`
	width: 67%;
	& > h2 {
		font-size: 1.2rem;
	}
	& > p {
		font-size: 0.9rem;
	}
`;

const MissionInfo = styled.div`
  display: flex;
	color: white;
  max-width: 850px;
	width: 850px;
	box-sizing: border-box;
	padding: 10px;
	margin-bottom: 20px;
	height: 150px;
	overflow-y: auto;
	height: fit-content;
	max-height: 150px;

	& > p {
		margin: 0;
		padding: 0;
		font-size: 0.9rem;
	}

	&::-webkit-scrollbar {
		width: 0; /* Remove scrollbar space */
		background: transparent; /* Optional: just make scrollbar invisible */
	}
`;

const Orbit = styled.div`
	width: 100%;
	color: white;
	margin-top: 150px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: fit-content;
	padding: 0 25px;
	box-sizing: border-box;

	& > h2 {
		margin: 0;
		font-size: 1.3rem;
	}

	& > span {
		background-color: ${Colors.orbitDiv};
		padding: 2px 10px;
		border-radius: 20px;
		height: 20px;
		display: flex;
		align-items: center;
	}
`;

const Header = styled.header`
	width: 850px;
	background-color: ${Colors.mainThemeColor};
	height: 150px;
	border-radius: 15px;
	position: absolute;
	top: -20px;
	overflow: hidden;
	display: flex;
	color: white;

	& > img {
		width: 33%;
		height: auto;
		object-fit: cover;
		border-radius: 15px;
	}
`;

export interface ILaunchCard {
	id: string;
	name: string;
	description: string;
	orbit: string;
	launchServiceProvider: string;
	country: string;
	place: string;
	image: string;
  date: string;
}

const LaunchCard: FC<ILaunchCard> = (props) => {
	return (
		<Card>
			<Header>
				{props.image ? (
					<img src={props.image} />
				) : (
					<img src='../../assets/images/NoPhoto.jpg' />
				)}
				<RocketInfo>
					<h2>{props.name}</h2>
					<Line />
					<p>
						{`${props.launchServiceProvider} | ${props.country} ${props.place}`}
					</p>
				</RocketInfo>
			</Header>
			<Orbit>
				<h2>Mission: </h2>
				<span>{props.orbit ? props.orbit : 'No orbit info'}</span>
			</Orbit>
			<MissionInfo>
				<p>{props.description ? props.description : 'No Description found'}</p>
			</MissionInfo>
			<LaunchDate date={props.date}/>
		</Card>
	);
};

export default LaunchCard;
