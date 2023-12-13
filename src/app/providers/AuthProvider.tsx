import { PropsWithChildren, createContext, useLayoutEffect, useState } from "react";
import { getData } from "src/shared/lib/api/api";
import { useLocalStorage } from "src/shared/useLocalStorage";


export interface ProfileInfo {
    firstname: string
    lastname: string
    avatar: string | null
}

export interface IUser {
    email?: string
    email_verified?: string
    id?: string
    profile?: ProfileInfo
}

interface AuthContextProps {
    isFetching: boolean
    token: string
    user: IUser
    setUserData: (...args: any) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextProps>({
    isFetching: false,
    token: '', user: {},
    setUserData: () => { },
    logout: () => { }
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [token, setToken] = useLocalStorage('AuthToken', null);

    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const data = await getData({ url: '/api/v1/user_profile', headers: { Authorization: `Bearer ${token}` }, dataFlag: true });

                setUser(data);

            } catch (error) {
                console.log(error);
            }
            finally {
                setIsFetching(false);
            }

        }

        if (token) {
            fetchData();
        }
    }, []);

    const logout = () => {
        setUser({});
        setToken('');
    }

    const setUserData = ({ token, user }: { token: string, user: IUser }) => {
        setToken(token)
        setUser(user)
    }

    return (
        <AuthContext.Provider value={{
            isFetching,
            user,
            token,
            setUserData,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}