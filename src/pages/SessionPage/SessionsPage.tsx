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
import { Loader } from "../../components/Loader/Loader";

export const SessionsPage: React.FC = () => {
  const user = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentDate, setCurrentDate] = useState<Moment>(moment());
  const [selectedOwners, setSelectedOwners] = useState<SelectOption[]>([]);
  const [isCreateSessionModalOpen, setIsCreateSessionModalOpen] =
    useState(false);
  const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] =
    useState(false);

  const getSession = async () => {
    setIsLoading(true);
    const formattedOwners = selectedOwners.map(({ value }) => value);
    const data = await getSessionsByOwners(formattedOwners);
    setSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSession();
  }, [selectedOwners]);

  const onSessionCreate = () => {
    getSession();
    setIsCreateSessionModalOpen(false);
  };

  const onScheduleCreate = () => {
    getSession();
    setIsCreateScheduleModalOpen(false);
  };

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
            Create separate session
          </button>
          <br />
          <button onClick={() => setIsCreateScheduleModalOpen(true)}>
            Create schedule of sessions
          </button>
        </>
      )}

      <Filters
        selectedUsers={selectedOwners}
        setSelectedUsers={setSelectedOwners}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <Sessions
          sessions={sessions}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          onDataUpdate={getSession}
        />
      )}
    </div>
  );
};
