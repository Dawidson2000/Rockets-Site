import { FC, useEffect, useState } from 'react';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import LaunchCard from '../components/Launches/LaunchCard';

import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 900px;
  margin: 0 auto;
  padding-top: 130px;
`;

export type Launch = {
  id: string,
  name: string,
  description: string,
  orbit: string,
  launchServiceProvider: string,
  country: string,
  place: string,
  image: string,
  date: string
};

const Launches: FC = () => {
	const [launches, setLaunches] = useState<Launch[]>([]);

	const { error, isLoading, sendRequest: fetchLaunches } = useHttp();

	useEffect(() => {
		const apllyLaunches = (launchObj: any) => {
			const loadedLaunches: Launch[] = launchObj.results.map((launch: any) => (
        {
          id: launch?.id,
					name: launch?.name,
					description: launch?.mission?.description,
					orbit: launch?.mission?.orbit?.name,
					launchServiceProvider: launch?.launch_service_provider?.name,
					country: launch?.pad?.location?.country_code,
					place: launch?.pad?.location?.name,
          image: launch?.image,
          date: launch?.net
        }
      ));
      setLaunches(loadedLaunches);
		};

		fetchLaunches(
			{
				url: 'https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?is_crewed=false&include_suborbital=true&related=false&hide_recent_previous=false',
			},
			apllyLaunches
		);
    return () => {};
	}, [fetchLaunches]);

  let content: any = launches.map((launch: Launch) => <LaunchCard key={launch.id} {...launch}/>);

  if (error) {
    content = <p style={{color: 'white'}}>Try again</p>;
  }

  if (isLoading) {
    content = <LoadingSpinner/>;
  }

	return (
    <Wrapper>
      {content}
    </Wrapper>
  );
};

export default Launches;
