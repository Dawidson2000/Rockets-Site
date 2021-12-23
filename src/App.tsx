import React from 'react';
import './App.css';
import styled from 'styled-components';
import LaunchCard from './components/Launches/LaunchCard';
import Launches from './components/Launches/Launches';

function App() {
	return (
		<div className='App'>
      <Launches/>
		</div>
	);
}

export default App;
