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
            let newWorkoutDays = action.payload.workoutDays;
            state.workoutDays = newWorkoutDays;
        },
        setLevel: (state, action) => {
            state.level = action.payload.level;
        },
        addWorkout: (state, action) => {
            state.myWorkouts.push(action.payload.workout);
        },
        editWorkout: (state, action) => {
            let index = state.myWorkouts.findIndex(
                i => i.id == action.payload.workout.id,
            );

            if (index >= 0) {
                state.myWorkouts[index] = action.payload.workout;
            }
        },
        removeWorkout: (state, action) => {
            state.myWorkouts = state.myWorkouts.filter(
                item => item.id != action.payload.workout.id,
            );
        },
        addProgress: (state, action) => {
            if (!state.dailyProgress.includes(action.payload.date)) {
                state.dailyProgress.push(action.payload.date);
            }
        },
        removeProgress: (state, action) => {
            state.dailyProgress = state.dailyProgress.filter(
                d => d != action.payload.date,
            );
        },
        setLastWorkout: (state, action) => {
            state.lastWorkout = action.payload.id;
        },
        reset: () => initialState,
    },
});

export const {
    setName,
    setWorkoutDays,
    setLevel,
    addWorkout,
    editWorkout,
    removeWorkout,
    addProgress,
    removeProgress,
    setLastWorkout,
    reset,
} = userSlice.actions;

export default userSlice.reducer;
