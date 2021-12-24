import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import SpacecraftCard from '../../components/Launches/SpacecraftCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import useHttp from '../../hooks/use-http';

import './styles.css';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	max-width: 900px;
	margin: 0 auto;
	padding-top: 150px;
	padding-left: 25px;
	padding-right: 25px;
  gap: 1.5rem;
`;

const PER_PAGE = 10;

const Spacecrafts: FC = () => {
	const [spacecrafts, setSpacecrafts] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(0);

	const { error, isLoading, sendRequest: fetchSpacecrafts } = useHttp();

	useEffect(() => {
		const apllySpacecrafts = (launchObj: any) => {
			const loadedSpacecrafts: any[] = [];
			const Spacecrafts: any[] = launchObj.results;

			Spacecrafts.forEach((spacecraft: any) => {
				console.log('rockets');
				loadedSpacecrafts.push({
					id: spacecraft?.id,
					name: spacecraft?.spacecraft?.name,
          img: spacecraft?.spacecraft?.spacecraft_config?.image_url
				});
			});
			console.log(loadedSpacecrafts);
			setSpacecrafts(loadedSpacecrafts);
		};

		fetchSpacecrafts(
			{
				url: 'https://lldev.thespacedevs.com/2.2.0/spacecraft/flight/?limit=100',
			},
			apllySpacecrafts
		);
	}, [fetchSpacecrafts]);

	const pageClickHandler = ({ selected: selectedPage }: any) => {
		setCurrentPage(selectedPage);
	};

	const offset = currentPage * PER_PAGE;

	const pageCount = Math.ceil(spacecrafts.length / PER_PAGE);

	let content: any = spacecrafts
		.slice(offset, offset + PER_PAGE)
		.map((spacecraft: any) => <SpacecraftCard key={spacecraft.id} {...spacecraft} />);

	if (error) {
		content = <p style={{ color: 'white' }}>Try again</p>;
	}

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	return (
		<Wrapper>
			{content}
			<ReactPaginate
				previousLabel={'PREVIOUS'}
				nextLabel={'NEXT'}
				breakLabel={'...'}
				breakClassName={'break-me'}
				pageCount={pageCount}
				marginPagesDisplayed={1}
				pageRangeDisplayed={3}
				onPageChange={pageClickHandler}
				containerClassName={'pagination'}
				previousLinkClassName={'pagination__link'}
				nextLinkClassName={'pagination__link'}
				disabledClassName={'pagination__link--disabled'}
				activeClassName={'pagination__link--active'}
			/>
		</Wrapper>
	);
};

export default Spacecrafts;
