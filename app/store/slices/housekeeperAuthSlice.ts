import api, { login, registerEmployer, registerHousekeeper } from "@/app/api/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


interface HousekeeperState {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    age: number;
    location: string;
    category: string;
    employment_type: string;
    certifications: string[];
    experience?: number;
    photo_url?: string;
}


const initialState: HousekeeperState = {
    name: "",
    email: "",
    password: "",
    phone_number: "",
    age: 0,
    location: "",
    category: "",
    employment_type: "",
    certifications: [],
    experience: 0,
    photo_url: "",
}

export const RegisterHousekeeper = createAsyncThunk(
    "auth/register/housekeeper",
    async (userData: HousekeeperState, { rejectWithValue }) => {
        try {
            console.log(userData)
            const response = await registerHousekeeper(userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || "Housekeeper Registration failed");
        }
    }
);


const authSlice = createSlice({
    name: "housekeeperAuth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RegisterHousekeeper.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
    },
});

export default authSlice.reducer;
