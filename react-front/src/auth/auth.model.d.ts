export interface claim{
    name: string;
    value: string;
}

export interface userCredentials{
    email: string;
    password: string;
}

export interface userCredentialsReg{
    email: string;
    password: string;
    username: string;
    name?: string;
    lastname?: string;
    dateOfBirth?: Date;
    address?: string;
    picture?: File;
    pictureURL?: string;

}

export interface editUserDTO{
    profile: userCredentialsReg;

}

export interface authenticationResponse{
    token: string;
    expiration: Date;
}

export interface userDTO{
    id: string;
    email: string;
}