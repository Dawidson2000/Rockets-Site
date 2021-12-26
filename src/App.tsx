import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoadingSpinner from './components/UI/LoadingSpinner';
import Events from './pages/Events';
import SpacecraftDetails from './pages/SpacecraftDetails';

const Launches = React.lazy(() => import('./pages/Launches'));
const Spacecrafts = React.lazy(() => import('./pages/Spacecrafts/Spacecrafts'));

function App() {
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
