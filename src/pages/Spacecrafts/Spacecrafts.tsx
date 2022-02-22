import { ChangeEvent, FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';
import SpacecraftCard from '../../components/Launches/SpacecraftCard';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import SearchInput from '../../components/UI/SearchInput';

import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import useHttp from '../../hooks/use-http';
import { spacecraftsActions } from '../../store/spacecrafts-slice';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	max-width: 900px;
	margin: 0 auto;
	padding-top: 130px;
	gap: 1.5rem;
`;

const PER_PAGE = 10;

export type Spacecraft = {
	id: number;
	name: string;
	img: string;
};

const Spacecrafts: FC = () => {
	const [filteredSpaceCrafts, setFilteredSpaceCrafts] = useState<Spacecraft[]>(
		[]
	);
	const [currentPage, setCurrentPage] = useState(0);
	const [filteredValue, setFilteredValue] = useState('');

	const spacecrafts = useSelector(
		(state: any) => state.spacecrafts.spacecrafts
	);
	const isSpacecraftTouched = useSelector(
		(state: any) => state.spacecrafts.isTouched
	);
	// const error = useSelector((state: any) => state.spacecrafts.error);
	// const isLoading = useSelector((state: any) => state.spacecrafts.isLoading);

	const { error, isLoading, sendRequest: fetchSpacecrafts } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
    dispatch(spacecraftsActions.setIsTouched(true));
		const apllySpacecrafts = (launchObj: any) => {
			const loadedSpacecrafts: Spacecraft[] = launchObj.results.map(
				(spacecraft: any) => ({
					id: spacecraft?.id,
					name: spacecraft?.spacecraft?.name,
					img: spacecraft?.spacecraft?.spacecraft_config?.image_url,
				})
			);
			dispatch(
				spacecraftsActions.setSpacecrafts({
					spacecrafts: loadedSpacecrafts,
					error,
					isLoading,
				})
			);
		};
		if (!isSpacecraftTouched) {
			fetchSpacecrafts(
				{
					url: 'https://lldev.thespacedevs.com/2.2.0/spacecraft/flight/?limit=100',
				},
				apllySpacecrafts
			);
		}

		return () => {};
	}, [fetchSpacecrafts, isSpacecraftTouched]);

	useEffect(() => {
		setFilteredSpaceCrafts(spacecrafts);
	}, [spacecrafts]);

	const offset = currentPage * PER_PAGE;

	const pageCount = Math.ceil(filteredSpaceCrafts.length / PER_PAGE);

	const pageClickHandler = ({ selected: selectedPage }: any) => {
		setCurrentPage(selectedPage);
	};

	let content: any = filteredSpaceCrafts
		.slice(offset, offset + PER_PAGE)
		.map((spacecraft: Spacecraft) => (
			<SpacecraftCard key={spacecraft.id} {...spacecraft} />
		));

	if (error) {
		content = <p style={{ color: 'white' }}>Try again</p>;
	}

	if (isLoading) {
		content = <LoadingSpinner />;
	}

	const inputSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const enteredValue = e.target.value;
		setFilteredValue(enteredValue);

		let filteredSpacecrafts = [...spacecrafts];
		filteredSpacecrafts = filteredSpacecrafts.filter((spacecraft) =>
			spacecraft.name.toLowerCase().includes(enteredValue.toLowerCase())
		);
		console.log(filteredSpacecrafts);
		setFilteredSpaceCrafts(filteredSpacecrafts);
	};

	return (
		<Wrapper>
			<div style={{ marginLeft: 'auto' }}>
				<SearchInput
					value={filteredValue}
					placeholder='Search by name...'
					onChange={inputSearchHandler}
				/>
			</div>
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
