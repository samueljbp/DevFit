import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    name: '',
    level: '', // beginner, intermediate, advanced
    workoutDays: [], //1-0
    myWorkouts: [],
    lastWorkout: '', //ID
    dailyProgress: ['2022-10-02', '2022-10-01'],
};

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload.name;
        },
    },
});

export const {setName} = userSlice.actions;

export default userSlice.reducer;
