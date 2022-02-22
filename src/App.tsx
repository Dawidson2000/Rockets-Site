import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Events from './pages/Events';
import SpacecraftDetails from './pages/SpacecraftDetails';
import useHttp from './hooks/use-http';
import { Spacecraft } from './pages/Spacecrafts/Spacecrafts';

import { useDispatch } from 'react-redux';
import { spacecraftsActions } from './store/spacecrafts-slice';

const Launches = React.lazy(() => import('./pages/Launches'));
const Spacecrafts = React.lazy(() => import('./pages/Spacecrafts/Spacecrafts'));

function App() {
  const { error, isLoading, sendRequest: fetchSpacecrafts } = useHttp();
  const dispatch = useDispatch();
	
  useEffect(() => {
		const apllySpacecrafts = (launchObj: any) => {
			const loadedSpacecrafts: Spacecraft[] = launchObj.results.map((spacecraft: any) => (
				{
					id: spacecraft?.id,
					name: spacecraft?.spacecraft?.name,
					img: spacecraft?.spacecraft?.spacecraft_config?.image_url,
				}
			));
			dispatch(spacecraftsActions.setSpacecrafts({
        spacecrafts: loadedSpacecrafts,
        error,
        isLoading
      }));
		};

		fetchSpacecrafts(
			{
				url: 'https://lldev.thespacedevs.com/2.2.0/spacecraft/flight/?limit=100',
			},
			apllySpacecrafts
		);

    return () => {};
	}, [fetchSpacecrafts]);

	return (
		<div className='App'>
			<Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path='/' element={<Navigate replace to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/upcoming-launches' element={<Launches />} />
          <Route path='/events' element={<Events />} />
          <Route path='/spacecrafts' element={<Spacecrafts />} />
          <Route path='/spacecrafts/spacecraft-details/:spacecraftId' element={<SpacecraftDetails />} />
        </Routes>
      </Suspense>
		</div>
	);
}

export default App;
