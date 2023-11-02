import { ReactNode, createContext, useEffect, useState } from "react";
import { getData } from "src/shared/lib/api/api";
import { useLocalStorage } from "src/shared/useLocalStorage";

interface IAuthProvider {
    children?: ReactNode
}

interface AuthContextProps {
    isFetching: boolean
    token: string
    profileData: Record<string, string>
}

export const AuthContext = createContext<AuthContextProps>({ isFetching: false, token: '', profileData: {} })

export const AuthProvider = ({ children }: IAuthProvider) => {
    const [profileData, setProfileData] = useState({});
    const [isFetching, setIsFetching] = useState(false);
    const [token, setToken] = useLocalStorage('AuthToken', null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const data = await getData({});
                setProfileData(data);
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

    return (
        <AuthContext.Provider value={{ isFetching, profileData, token }}>
            {children}
        </AuthContext.Provider>
    )
}