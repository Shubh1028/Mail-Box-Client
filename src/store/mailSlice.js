import { createSlice } from "@reduxjs/toolkit";

const intialMailState = {  mail: {}, totalNotOpened: 0 };

const mailSlice = createSlice({
    name: "mail",
    initialState: intialMailState,
    reducers: {
        replaceMail(state, action) {
            state.mail = action.payload;
        },
        countNotOpened(state, action) {
            state.totalNotOpened = action.payload;
        },
    }
});


export const mailActions = mailSlice.actions;

export default mailSlice;