import { FC } from 'react';
import styled from 'styled-components';

import CardHelper from '../UI/Card';
import LaunchDate from './LaunchDate';
import { Colors } from '../../styledHelpers/Colors';
import { media } from '../../styledHelpers/Breakpoints';

const Card = styled(CardHelper)`
	width: 100%;
	background-color: ${Colors.cardBackground};
	position: relative;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	margin-bottom: 100px;

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
`;

const RocketInfo = styled.div`
	box-sizing: border-box;
	padding: 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  & > h2 {
		font-size: 1.2rem;
	}
	& > p {
		font-size: 0.9rem;
	}
	${media.tablet`
    width: 67%;
    box-sizing: border-box;
    padding: 10px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > h2 {
      font-size: 1.2rem;
    }
    & > p {
      font-size: 0.9rem;
    }
	`}
`;

const MissionInfo = styled.div`
	color: white;
	width: 95%;
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
	${media.tablet`
    //margin-top: 200px;
    padding: 0 25px;
    flex-direction: row;
	`}
	
  width: 100%;
	color: white;
	//margin-top: 220px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: fit-content;
  padding: 0 25px;
	padding-bottom: 20px;
	box-sizing: border-box;
  flex-direction: column;

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

export interface IHeader {
  img: string;
}

const Header = styled.header<IHeader>`
	${media.tablet`
  flex-direction: row;

	& > img {
		min-width: 33% !important;
    }	
	`}

	width: 95%;
  min-height: 200px;
  height: fit-content;
	background-color: ${Colors.mainThemeColor};
	border-radius: 15px;
	//position: absolute;
	//top: -20px;
  transform: translateY(-20px);
	overflow: hidden;
	display: flex;
	color: white;
	flex-direction: column;
  align-items: center;
  background-image: ${(props: any) => `url(${props.img})`};
	background-position: center;
  background-size: cover;

	& > img {
		min-width: 100%;
		height: 220px;
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
			<Header img={props.image ? props.image : '../../assets/images/NoPhoto.jpg'}>			
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
			<LaunchDate date={props.date} />
		</Card>
	);
};

export default LaunchCard;
