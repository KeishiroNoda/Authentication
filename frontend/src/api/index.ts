import axios, { CancelTokenSource, AxiosInstance, AxiosResponse } from "axios";
import { SignInInfo, SignUpInfo } from "../types";

import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "react-query";


export class AuthQuery {
    private readonly api: AxiosInstance;

    constructor(url: string = 'http://localhost:8000') {
        this.api = axios.create({
            baseURL: url
        });
    }

    public readonly postSignIn = async (info: SignInInfo) => {
        const res: AxiosResponse<boolean> = await this.api.post('/signin', info);
        return res.data;
    };

    public readonly postSignUp = async (info: SignUpInfo) => {
        const res: AxiosResponse<boolean> = await this.api.post('/signup', info);
        return res.data;
    };
}