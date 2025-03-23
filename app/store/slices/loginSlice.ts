import api, { login, registerEmployer, registerHousekeeper } from "@/app/api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface LoginState {
    email: string;
    password: string;
    user_type: string;
}


const initialState: LoginState = {
    email: "",
    password: "",
    user_type: "",
}


export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData: LoginState, { rejectWithValue }) => {
        try {
            console.log(userData)
            const response = await login(userData.email, userData.password, userData.user_type);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userType", userData.user_type);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            });
    },
});

export default authSlice.reducer;
