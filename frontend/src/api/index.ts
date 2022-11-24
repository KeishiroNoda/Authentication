import axios, { CancelTokenSource, AxiosInstance, AxiosResponse } from "axios";
import { SignInInfo, SignUpInfo, SignAllInfo } from "../types";

import { useQuery, UseQueryOptions, useMutation, useQueryClient } from "react-query";
import { read } from "fs";


export class AuthQuery {
    private readonly api: AxiosInstance;

    constructor(url: string = 'http://localhost:8000') {
        this.api = axios.create({
            baseURL: url
        });
    }

    public readonly postSignIn = async (info: SignInInfo) => {
        const res: AxiosResponse<SignInInfo> = await this.api.post('/signin', info);
        return res.data;
        
    };

    public readonly postSignUp = async (info: SignUpInfo) => {
        const res: AxiosResponse<boolean> = await this.api.post('/signup', info);
        return res.data;
    };

    public readonly getAllInfo = async () => {
        const res: AxiosResponse<SignAllInfo[]> = await this.api.get('/getall');
        return res.data;
    };

    public readonly useGetAllInfo = () => {
        return useQuery(["SignAllInfo"], this.getAllInfo).data;
    };

    public readonly deleteInfo = async (info: {id: number}) => {
        const res: AxiosResponse<boolean> = await this.api.post('/delete', info);
        return res.data;
    };
}