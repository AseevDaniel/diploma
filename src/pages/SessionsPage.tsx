import React, {useEffect, useState} from "react";
import {CreateSession} from "../components/CreateSession";
import {getSessions} from "../services/sessionService";
import {Session} from "../interfaces/Session";
import {Modal} from "../components/Modal/Modal";
import {getUserData} from "../services/userService";
import {useAuth} from "../hooks/useAuth";




export const SessionsPage: React.FC = () => {

    const [sessions, setSessions] = useState<Session[]>([])
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const getSession = async () => {
        const data = await getSessions()
        setSessions(data)
    }

    useEffect(() => {
        getSession()

    }, [])

    const onSessionCreate = () => {
        getSession()
        setIsCreateModalOpen(false)
    }

    return <div>
            <h1>Welcome</h1>

            <button onClick={() => setIsCreateModalOpen(true)}>Create session</button>

            {isCreateModalOpen && <Modal onClose={() => setIsCreateModalOpen(false)}>
                <CreateSession onCreate={onSessionCreate}/>
            </Modal> }


            {sessions.map( (session, index) => {
                return <div key={session.name + index}>
                    <p>{session.phone}</p>
                    <p>{session.name}</p>
                    <p>{session.startDate}</p>
                    <p>{session.endDate}</p>
                    <hr/>
                </div>
            })}

        </div>
}