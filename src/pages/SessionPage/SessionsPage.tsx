import React, { useEffect, useState } from "react";
import { CreateSession } from "./components/CreateSession/CreateSession";
import { getSessions } from "../../services/sessionService";
import { Session } from "../../interfaces/Session";
import { Modal } from "../../components/Modal/Modal";
import { Sessions } from "./components/Sessions/Sessions";
import moment, { Moment } from "moment";
import { Filters } from "./components/Filters";
import { getUsersByFilters } from "../../helpers/userHelpers";

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
    getUsersByFilters({});
  }, []);

  const onSessionCreate = () => {
    getSession();
    setIsCreateModalOpen(false);
  };

  return (
    <div>
      {isCreateModalOpen && (
        <Modal
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Session"
        >
          <CreateSession onCreate={onSessionCreate} />
        </Modal>
      )}
      <button onClick={() => setIsCreateModalOpen(true)}>Create session</button>

      <Filters />

      <Sessions
        sessions={sessions}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
    </div>
  );
};
