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

interface CurrentSessionProps {
  session: Session;
}

export const CurrentSession: React.FC<CurrentSessionProps> = ({ session }) => {
  const { name, address, phone, endDate, startDate, isAvailable, ownerUid } =
    session;
  const user = useContext(AuthContext);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

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

        <div
          onClick={() => setIsConfirmModalOpen(true)}
          className={`bookButton ${isAvailable ? "available" : "unavailable"}`}
        >
          {isAvailable ? "Book a session" : "Reserved"}
        </div>
      </div>
      {isConfirmModalOpen && (
        <ConfirmModal
          onConfirm={() => console.log(user, session)}
          onClose={() => setIsConfirmModalOpen(false)}
        ></ConfirmModal>
      )}
    </>
  );
};
