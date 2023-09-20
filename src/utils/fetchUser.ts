import { User } from "../types/user.type";

export const fetchUser = ():User => {
    const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : localStorage.clear();
    if (Array.isArray(userInfo)) {
        return userInfo[0];
    } else {
        return userInfo;
    }
}


