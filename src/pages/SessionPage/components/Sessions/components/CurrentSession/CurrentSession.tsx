import React, { useContext, useState } from "react";
import { Session } from "../../../../../../interfaces/Session";
import moment from "moment";
import { DATE_FORMATS } from "../../../../../../constants/date";
import { convertDateToDefaultFormat } from "../../../../../../helpers/dateHelpers";
import {
  ADDRESS_IMAGE,
  PHONE_IMAGE,
  PROFILE_IMAGE,
} from "../../../../../../constants/images";
import { AuthContext } from "../../../../../../App";
import { ConfirmModal } from "../../../../../../components/Modal/ConfirmModal";
import { writeUserData } from "../../../../../../services/userService";
import { Loader } from "../../../../../../components/Loader/Loader";
import { updateSession } from "../../../../../../services/sessionService";
import { Link } from "react-router-dom";
import { UserForSession } from "../../../../../../interfaces/User";
import "./currentSession.scss";

interface CurrentSessionProps {
  session: Session;
  onReserve?: () => void;
  isWithoutBooking?: boolean;
}

export const CurrentSession: React.FC<CurrentSessionProps> = ({
  session,
  onReserve,
  isWithoutBooking = false,
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

  const checkUserData = () => {
    user?.phone
      ? setIsConfirmModalOpen(true)
      : alert("Firstly enter phone number in your profile");
  };

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

  const getBookingButton = () => {
    if (isWithoutBooking) return <></>;

    if (!user)
      return (
        <Link className="notAuth" to="/login">
          Log in to reserve
        </Link>
      );

    if (user.uid === session.ownerUid)
      return <div className="notAuth">It`s your session</div>;

    return (
      <div
        onClick={checkUserData}
        className={`bookButton ${isAvailable ? "available" : "unavailable"}`}
      >
        {isAvailable ? "Book a session" : "Reserved"}
      </div>
    );
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

        {getBookingButton()}
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
