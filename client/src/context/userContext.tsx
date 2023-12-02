import { Dispatch, SetStateAction, createContext } from "react";
export type User = {
    _id: string,
    role: string,
    name: string,
    email: string,
    createdAt: string,
    updatedAt: string,
    __v: number
} | null;
type UserContextProps = {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}
const UserContext = createContext<UserContextProps>({ user: null, setUser: () => null })

export default UserContext;