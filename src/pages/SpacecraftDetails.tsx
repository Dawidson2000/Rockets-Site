import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CardHelper from '../components/UI/Card';
import useHttp from '../hooks/use-http';
import { Colors } from '../styledHelpers/Colors';

import { IoMdRocket } from 'react-icons/io';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Card = styled(CardHelper)`
  max-width: 900px;
  margin-top: 150px;
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

  & > p {
    background-color: ${Colors.mainThemeColor};
    padding: 5px 10px;
    width: fit-content;
    border-radius: 20px;
    margin: 0;
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
      color: ${Colors.mainThemeColor}
    }
  }
`;

export type SpacecraftDetails = {
  id: number,
  name: string,
  status: string,
  description: string,
  agency: {
    name: string,
    type: string,
    countryCode: string,
    rocket: string,
  },
  img: string,
  payloadCapacity: number,
  maidenFlight: string,
  height: number,
  diameter: number,
  capability: string
}

const SpacecraftDetails: FC = () => {
  const [details, setDetails] = useState<SpacecraftDetails>({} as SpacecraftDetails);

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
            rocket: spacecraftDetail?.spacecraft?.spacecraft_config?.agency?.launchers
          },
          img: spacecraftDetail?.spacecraft?.spacecraft_config?.image_url,
          payloadCapacity: spacecraftDetail?.spacecraft?.spacecraft_config?.payload_capacity,
          maidenFlight: spacecraftDetail?.spacecraft?.spacecraft_config?.maiden_flight,
          height: spacecraftDetail?.spacecraft?.spacecraft_config?.height,
          diameter: spacecraftDetail?.spacecraft?.spacecraft_config?.diameter,
          capability: spacecraftDetail?.spacecraft?.spacecraft_config?.capability,
      }
			setDetails(detailsData);
		};

		fetchSpacecraftDetail(
			{
				url: `https://lldev.thespacedevs.com/2.2.0/spacecraft/flight/${spacecraftId}/`,
			},
			apllyDetails
		);
	}, [fetchSpacecraftDetail]);

  let content: any = 
  <> 
    <SpacecraftPhoto img={details.img} />
    <h2>{details?.name}</h2>
    <SpacecraftParameters>
      <p>Status: {details?.status}</p>
      <p>Diameter: {details.diameter}m</p>
      <p>Height: {details.height}m</p>
      <p>Maiden Flight: {details.maidenFlight}</p>
      <p>Payload Capacity: {details.payloadCapacity}kg</p>
    </SpacecraftParameters>       
    <Agency>
      <p>{details.capability}</p>
      <p>{details?.agency?.name} {details?.agency?.countryCode}</p>
    </Agency>
    <Description>
      <h3>Description: </h3>
      <h4>Lifted by:  <IoMdRocket/> {details?.agency?.rocket}</h4>
      <p>{details?.description}</p>
    </Description>
  </>

  if (error) {
		content = <p style={{ color: 'white' }}>Something went wrong</p>;
	}

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
    <Card>
      <section>
        {content}
      </section>
    </Card>
  );
};

export default SpacecraftDetails;
