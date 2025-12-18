import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { profile } from "@/api/auth";
import { IUser } from "@/types";

interface userState {
    user: IUser | null;
    loading: boolean;
    error: string | null ;
}

const initialState: userState = {
    user: null,
    loading: false,
    error: null,
}

export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async () => {
        return await profile();
    }
)

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro desconhecido"
            })
    }
})

export default userSlice.reducer;