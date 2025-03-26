import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    userToken: null,
    userType: null,
    userInfo: null,
    isAuthenticated: false,
};

export const logoutUser = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userInfo");
});


const authSlice = createSlice({
    name: "logout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.userToken = null;
            state.userType = null;
            state.userInfo = null;
            state.isAuthenticated = false;
        });
    },
});

export default authSlice.reducer;
