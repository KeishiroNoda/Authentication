export interface SignInInfo {
	email: string;
	password: string;
}

export interface SignUpInfo {
	firstName: string;
	lastName: string;
	email: string;
	twitter: string;
	password: string;
}

export interface SignAllInfo {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	twitter: string;
	password: string;
}

export interface SignInInfo2 {
	email: string;
	password: string;
	onetimePass: string;
}
