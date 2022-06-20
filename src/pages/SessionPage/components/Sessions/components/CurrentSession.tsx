import React, { useContext, useState } from "react";
import { Session } from "../../../../../interfaces/Session";
import moment from "moment";
import { DATE_FORMATS } from "../../../../../constants/date";
import { convertDateToDefaultFormat } from "../../../../../helpers/dateHelpers";
import {
  ADDRESS_IMAGE,
  PHONE_IMAGE,
  PROFILE_IMAGE,
} from "../../../../../constants/images";
import { AuthContext } from "../../../../../App";
import { ConfirmModal } from "../../../../../components/Modal/ConfirmModal";
import { writeUserData } from "../../../../../services/userService";
import { Loader } from "../../../../../components/Loader/Loader";
import { updateSession } from "../../../../../services/sessionService";
import { Link } from "react-router-dom";
import { UserForSession } from "../../../../../interfaces/User";

interface CurrentSessionProps {
  session: Session;
  onReserve?: () => void;
}

export const CurrentSession: React.FC<CurrentSessionProps> = ({
  session,
  onReserve,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    name,
    address,
    phone,
    endDate,
    startDate,
    isAvailable,
    id: sessionId,
  } = session;
  const user = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const reserveSession = async () => {
    console.log(user);
    if (user?.uid) {
      setIsLoading(true);
      await writeUserData({
        ...user,
        sessionsAccepted: [...(user?.sessionsAccepted || []), session],
      });
      await onSessionReserve({
        name: user?.name!,
        phone: user?.phone!,
        id: user?.uid,
      });
      setIsLoading(false);
      onReserve?.();
    } else {
      alert("Error((( try again");
    }
    setIsConfirmModalOpen(false);
  };

  const onSessionReserve = async (client: UserForSession) => {
    return await updateSession(sessionId, {
      ...session,
      isAvailable: false,
      client,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <div
        className={`currentSession ${
          isAvailable ? "animateSession" : "unavailableSession"
        }`}
      >
        <div className="dateTime">
          <span className="date">
            {moment(startDate).format(DATE_FORMATS.DATE_FOR_SLOT)}
          </span>
          <span className="time">{`${convertDateToDefaultFormat(
            startDate,
            DATE_FORMATS.DEFAULT_TIME
          )} -
          ${convertDateToDefaultFormat(endDate, DATE_FORMATS.DEFAULT_TIME)}
          `}</span>
        </div>

        <div className="masterInfo">
          <h1>
            <img src={PROFILE_IMAGE} alt="" />
            {name}
          </h1>
          <h2>
            <img src={PHONE_IMAGE} alt="" />
            {phone}
          </h2>
        </div>

        <div className="address">
          <h1 className={`${address ? "" : "emptyAddress"}`}>
            <img src={ADDRESS_IMAGE} alt="" />
            {address || "Get the address by phone"}
          </h1>
        </div>

        {!!user ? (
          <div
            onClick={() => setIsConfirmModalOpen(true)}
            className={`bookButton ${
              isAvailable ? "available" : "unavailable"
            }`}
          >
            {isAvailable ? "Book a session" : "Reserved"}
          </div>
        ) : (
          <Link className="notAuth" to="/login">
            Log in to reserve
          </Link>
        )}
      </div>

      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={reserveSession}
          onClose={() => setIsConfirmModalOpen(false)}
        ></ConfirmModal>
      )}
    </>
  );
};
