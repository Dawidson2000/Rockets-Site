import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CardHelper from '../components/UI/Card';
import useHttp from '../hooks/use-http';
import { Colors } from '../styledHelpers/Colors';

import { IoMdRocket } from 'react-icons/io';
import { FaRocketchat } from 'react-icons/fa';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Card = styled(CardHelper)`
	max-width: 900px;
	margin-top: 130px;
	margin-right: auto;
	margin-left: auto;
	background-color: ${Colors.cardBackground};
	color: white;
	box-sizing: border-box;
	padding: 20px;
`;

export interface ISpacecraftPhoto {
	img: string;
}

const SpacecraftPhoto = styled.div<ISpacecraftPhoto>`
	width: 100%;
	height: 300px;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 15px;
	background-image: ${(props) => `url(${props.img})`};
	background-position: center;
	background-size: cover;
	margin-bottom: 20px;
`;

const SpacecraftParameters = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 1rem;
`;

export interface IParametersLabel {
	backgroundColor: string;
}

const ParametersLabel = styled.p<IParametersLabel>`
	background-color: ${(props) => props.backgroundColor};
	padding: 5px 10px;
	width: fit-content;
	border-radius: 20px;
	margin: 0;
  display: flex;
  align-items: center;

  & > svg {
    margin-left: 0.5rem;
  }
`;

const Agency = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	margin-top: 20px;

	& > p {
		margin: 0;
	}
`;

const Description = styled.div`
	width: 100%;
	& > h3 {
		width: fit-content;
		margin: 0;
		margin-top: 20px;
	}

	& > h4 {
		margin-right: auto;
		width: fit-content;
		margin: 0;
		font-weight: 500;
		display: flex;
		align-items: center;

		& > svg {
			font-size: 25px;
		}
	}
`;

export type SpacecraftDetails = {
	id: number;
	name: string;
	status: string;
	description: string;
	agency: {
		name: string;
		type: string;
		countryCode: string;
		rocket: string;
	};
	img: string;
	payloadCapacity: number;
	maidenFlight: string;
	height: number;
	diameter: number;
	capability: string;
};

const SpacecraftDetails: FC = () => {
	const [details, setDetails] = useState<SpacecraftDetails>(
		{} as SpacecraftDetails
	);

	const params = useParams();
	const spacecraftId = params.spacecraftId;

	const { error, isLoading, sendRequest: fetchSpacecraftDetail } = useHttp();

	useEffect(() => {
		const apllyDetails = (spacecraftDetail: any) => {
			const detailsData: SpacecraftDetails = {
				id: spacecraftDetail?.spacecraft?.id,
				name: spacecraftDetail?.spacecraft?.name,
				status: spacecraftDetail?.spacecraft?.status?.name,
				description: spacecraftDetail?.spacecraft?.description,
				agency: {
					name: spacecraftDetail?.spacecraft?.spacecraft_config?.agency?.name,
					type: spacecraftDetail?.spacecraft?.spacecraft_config?.agency?.type,
					countryCode: spacecraftDetail?.spacecraft?.spacecraft_config?.agency?.country_code,
					rocket: spacecraftDetail?.spacecraft?.spacecraft_config?.agency?.launchers,
				},
				img: spacecraftDetail?.spacecraft?.spacecraft_config?.image_url,
				payloadCapacity: spacecraftDetail?.spacecraft?.spacecraft_config?.payload_capacity,
				maidenFlight: spacecraftDetail?.spacecraft?.spacecraft_config?.maiden_flight,
				height: spacecraftDetail?.spacecraft?.spacecraft_config?.height,
				diameter: spacecraftDetail?.spacecraft?.spacecraft_config?.diameter,
				capability: spacecraftDetail?.spacecraft?.spacecraft_config?.capability,
			};
			setDetails(detailsData);
		};

		fetchSpacecraftDetail(
			{
				url: `https://lldev.thespacedevs.com/2.2.0/spacecraft/flight/${spacecraftId}/`,
			},
			apllyDetails
		);
	}, [fetchSpacecraftDetail]);

	let content: any = (
		<>
			<SpacecraftPhoto img={details.img} />
			<h2>{details?.name}</h2>
			<SpacecraftParameters>
				<ParametersLabel backgroundColor='#FF6F61'>
					Status: {details.status ? `${details.status}` : <FaRocketchat/>}
				</ParametersLabel>
				<ParametersLabel backgroundColor='#88B04B'>
					Diameter: {details.diameter ? `${details.diameter}m` : <FaRocketchat/>}
				</ParametersLabel>
				<ParametersLabel backgroundColor='#45B8AC'>
					Height: {details.height ? `${details.height}m` : <FaRocketchat/>}
				</ParametersLabel>
				<ParametersLabel backgroundColor='#EFC050'>
					Maiden Flight: {details.maidenFlight ? `${details.maidenFlight}`: <FaRocketchat/>}
				</ParametersLabel>
				<ParametersLabel backgroundColor='#9B2335'>
					Payload Capacity: {details.payloadCapacity ? `${details.payloadCapacity}kg` : <FaRocketchat/>}
				</ParametersLabel>
			</SpacecraftParameters>
			<Agency>
				<p>{details.capability}</p>
				<p>
					{details?.agency?.name} {details?.agency?.countryCode}
				</p>
			</Agency>
			<Description>
				<h3>Description: </h3>
				<h4>
					Lifted by: <IoMdRocket /> {details?.agency?.rocket}
				</h4>
				<p>{details?.description}</p>
			</Description>
		</>
	);

	if (error) {
		content = <p style={{ color: 'white' }}>Something went wrong</p>;
	}

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
		<Card>
			<section>{content}</section>
		</Card>
	);
};

export default SpacecraftDetails;
