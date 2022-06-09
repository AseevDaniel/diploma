import React from "react";
import { Session } from "../../../../../interfaces/Session";

interface CurrentSessionProps {
  session: Session;
}

export const CurrentSession: React.FC<CurrentSessionProps> = ({ session }) => {
  const sessionFields = Object.keys(session) as (keyof Session)[];

  return (
    <div className="currentSession">
      {sessionFields.map((field, index) => {
        return (
          <div className="sessionField" key={field + index}>
            <p>{field}: </p>
            <p>{session[field]}</p>
          </div>
        );
      })}
    </div>
  );
};
