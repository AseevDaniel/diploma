import React, { useContext, useEffect, useState } from "react";
import { CreateSession } from "./components/CreateSession/CreateSession";
import { getSessionsByOwners } from "../../services/sessionService";
import { Session } from "../../interfaces/Session";
import { Modal } from "../../components/Modal/Modal";
import { Sessions } from "./components/Sessions/Sessions";
import moment, { Moment } from "moment";
import { Filters } from "./components/Filters/Filters";
import { SelectOption } from "../../interfaces/Select";
import { AuthContext } from "../../App";
import { isUserCanManageSession } from "../../helpers/userHelpers";
import { CreateSchedule } from "./components/CreateSchedule/CreateSchedule";

export const SessionsPage: React.FC = () => {
  const user = useContext(AuthContext);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [selectedOwners, setSelectedOwners] = useState<SelectOption[]>([]);
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] =
    useState(false);
  const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] =
    useState(false);

  const getSession = async () => {
    const formattedOwners = selectedOwners.map(({ value }) => value);
    const data = await getSessionsByOwners(formattedOwners);
    console.log(data);
    setSessions(data);
  };

  useEffect(() => {
    getSession();
  }, [selectedOwners]);

  const onSessionCreate = () => {
    getSession();
    setIsCreateSessionModalOpen(false);
  };

  const onScheduleCreate = () => {};

  return (
    <div>
      {isCreateSessionModalOpen && (
        <Modal
          onClose={() => setIsCreateSessionModalOpen(false)}
          title="Create Session"
        >
          <CreateSession onCreate={onSessionCreate} />
        </Modal>
      )}

      {isCreateScheduleModalOpen && (
        <Modal
          onClose={() => setIsCreateScheduleModalOpen(false)}
          title="Create Schedule"
        >
          <CreateSchedule onCreate={onScheduleCreate} />
        </Modal>
      )}
      {isUserCanManageSession(user) && (
        <>
          <button onClick={() => setIsCreateSessionModalOpen(true)}>
            Create session
          </button>
          <button onClick={() => setIsCreateScheduleModalOpen(true)}>
            Create schedile
          </button>
        </>
      )}

      <Filters
        selectedUsers={selectedOwners}
        setSelectedUsers={setSelectedOwners}
      />

      <Sessions
        sessions={sessions}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        onDataUpdate={getSession}
      />
    </div>
  );
};
