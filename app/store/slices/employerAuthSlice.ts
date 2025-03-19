import api, { login, registerEmployer, registerHousekeeper } from "@/app/api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface EmployerState {
    name: string;
    email: string;
    password: string;
    address: string;
    phone_number: string;
    familySize?: number;
}

const initialState: EmployerState = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    familySize: 0,
}

export const RegisterEmployer = createAsyncThunk(
    "auth/register/employer",
    async (userData: EmployerState, { rejectWithValue }) => {
        try {
            console.log(userData)
            const response = await registerEmployer(userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Employer Registration failed");
        }
    }
);


const authSlice = createSlice({
    name: "employerAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RegisterEmployer.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
    },
});

export default authSlice.reducer;
