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
        setWorkoutDays: (state, action) => {
            state.workoutDays = action.payload.workoutDays;
        },
        setLevel: (state, action) => {
            state.level = action.payload.level;
        },
        addWorkout: (state, action) => {
            state.myWorkouts.push(action.payload.workout);
        },
        removeWorkout: (state, action) => {
            state.myWorkouts = state.myWorkouts.filter(
                item => item.id != action.payload.workout.id,
            );
        },
    },
});

export const {setName, setWorkoutDays, setLevel, addWorkout, removeWorkout} =
    userSlice.actions;

export default userSlice.reducer;
