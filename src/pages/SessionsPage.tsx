import React, { useEffect, useState } from "react";
import { CreateSession } from "../components/CreateSession";
import { getSessions } from "../services/sessionService";
import { Session } from "../interfaces/Session";
import { Modal } from "../components/Modal/Modal";
import { getUserData } from "../services/userService";
import { useAuth } from "../hooks/useAuth";
import { Sessions } from "../components/Sessions/Sessions";
import moment, { Moment } from "moment";

export const SessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getSession = async () => {
    const data = await getSessions();
    setSessions(data);
  };

  useEffect(() => {
    getSession();
  }, []);

  const onSessionCreate = () => {
    getSession();
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      {isCreateModalOpen && (
        <Modal onClose={() => setIsCreateModalOpen(false)}>
          <CreateSession onCreate={onSessionCreate} />
        </Modal>
      )}

      <Sessions
        sessions={sessions}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      <button onClick={() => setIsCreateModalOpen(true)}>Create session</button>
    </div>
  );
};
