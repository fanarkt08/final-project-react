import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment: (state, action) => {
            const { note, comment } = action.payload;
            state.push({
                id: Date.now(),
                note,
                comment,
            });
        },

        deleteComment: (state, action) => {
            const index = state.findIndex((c) => c.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
    },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
