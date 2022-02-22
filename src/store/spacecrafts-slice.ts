import { createSlice } from '@reduxjs/toolkit';
import { Spacecraft } from '../pages/Spacecrafts/Spacecrafts';
import useHttp from '../hooks/use-http';
import { useCallback, useState } from 'react';

const spacecraftsSlice = createSlice({
	name: 'spacecrafts',
	initialState: {
		spacecrafts: [] as Spacecraft[],
		isLoading: false,
		error: null,
	},
	reducers: {
		setSpacecrafts(state, action) {
      const spacecrafts = action.payload;
      state.spacecrafts = spacecrafts.spacecrafts;
      state.isLoading = spacecrafts.isLoading;
      state.error = spacecrafts.error;
    },
	},
});

export const spacecraftsActions = spacecraftsSlice.actions;

export default spacecraftsSlice;
