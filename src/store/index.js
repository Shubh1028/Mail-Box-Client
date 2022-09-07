import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./mailSlice";


const store = configureStore({
    reducer: { mail: mailSlice.reducer }
});

export default store;