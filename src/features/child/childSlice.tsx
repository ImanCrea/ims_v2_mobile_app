import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  children: [],
  selectedChild: null,
};

const childSlice = createSlice({
  name: 'child',
  initialState,
  reducers: {
    getUserChildren: (state, action) => {
      state.children = action.payload.user.userDetails.personDetails.enfants;
      const child: any = action.payload.user.userDetails.personDetails.enfants;
      state.selectedChild = child.length > 0 ? child[0] : null;
    },
    changeChild: (state, action) => {
      state.selectedChild = action.payload;
    },
    initializeChildValue: state => {
      return initialState;
    },
  },
});

export const {getUserChildren, changeChild, initializeChildValue} =
  childSlice.actions;

export default childSlice.reducer;
