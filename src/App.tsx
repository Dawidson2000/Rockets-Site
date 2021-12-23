import React from 'react';
import './App.css';
import styled from 'styled-components';
import LaunchCard from './components/Launches/LaunchCard';
import Launches from './pages/Launches';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className='App'>
      <Navbar/>
      <Launches/>
		</div>
	);
}

export default App;
