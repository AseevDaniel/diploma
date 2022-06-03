import React, {useEffect} from "react";
import {useAuth} from "../hooks/useAuth";
import {getUserData, writeUserData} from "../services/userService";
import {User} from "../interfaces/User";

interface ProfilePageProps {

}

export const ProfilePage: React.FC<ProfilePageProps> = ({}) => {

    const {id, email} = useAuth()

    const onGet = (data: any) => {
        console.log(data as User)
    }

    const setData = async () => {
        if(email && id){
            const a = await writeUserData({
                email,
                uid: id,
                name: 'danya',
                phone: '0974911716'
            })
            console.log(a)
        }
    }

    const getValue = async () => {
        console.log(id)
        if(id){
            const a = await getUserData(id, onGet)
        }
    }

    useEffect(() => {

        getValue()
    }, [])
    return <>
        <button onClick={setData}>click</button>
    </>
}