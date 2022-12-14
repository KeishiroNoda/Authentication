import axios, { CancelTokenSource, AxiosInstance, AxiosResponse } from "axios";
import { SignInInfo, SignUpInfo, SignAllInfo, SignInInfo2 } from "../types";

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

    public readonly postSignInCase1_1 = async (info: SignInInfo) => {
        const res: AxiosResponse<string> = await this.api.post('/signin_case1_1', info);
        return res.data;
    };

    public readonly postSignInCase1_2 = async () => {
        const res: AxiosResponse<boolean> = await this.api.get('/signin_case1_2');
        console.log(res.data)
        return res.data;
    };

    // public readonly postSignInCase1_2 = async (info: SignInInfo, onetimePass: string) => {
    //     const res: AxiosResponse = await this.api.post('/signin_case1_2', {...info, onetimePass:onetimePass});
    //     return res.data;
    // };

    public readonly postSignInCase2_1 = async () => {
        const res: AxiosResponse = await this.api.post('/signin_case2_1');
        return 
    };

    public readonly postSignInCase2_2 = async (info: SignInInfo2) => {
        const res: AxiosResponse = await this.api.post('/signin_case2_2', info);
        return res.data;
    };

    public readonly killThread = async () => {
        const res: AxiosResponse = await this.api.post('/kill_thread');
        return 
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