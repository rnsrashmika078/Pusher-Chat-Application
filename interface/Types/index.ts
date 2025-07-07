export interface Friend {
    email: string;
    firstname: string;
    lastname: string;
    profilePicture?: string;
    lastmessage: string;
    recievedtime: string;
    unread: number;
}
export interface User {
    _id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email: string;
    profileImage?: string;
    coverImage?: string | null;
    token?: string;
}
export interface SignInData {
    username: string;
    password: string;
}

export interface SignUpData {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    confirm: string;
}

