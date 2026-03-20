import { api } from "../../../shared/api/axiosInstance";

export interface LoginPayload {
    username: string;
    password: string;
    expiresInMins?: number;
}

export interface AuthResponse {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
}

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data;
}