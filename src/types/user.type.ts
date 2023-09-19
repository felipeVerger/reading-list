export interface User {
    _createdAt?: string;
    _id?: string;
    _rev?: string;
    _type?: string;
    _updatedAt?: string;
    email: string
    image: string;
    password:string;
    username:string;
    userToken?: string
}