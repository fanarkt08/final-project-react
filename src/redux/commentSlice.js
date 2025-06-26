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
            return state.filter((comment) => comment.id !== action.payload);
        },
    },
});

export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
