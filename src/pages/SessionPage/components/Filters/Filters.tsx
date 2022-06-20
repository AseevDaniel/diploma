import React, { useEffect, useState } from "react";
import { getUsersForFilters } from "../../../../services/userService";
import Select from "react-select";
import { SelectOption } from "../../../../interfaces/Select";
import "./filters.scss";

interface FiltersProps {
  selectedUsers: SelectOption[];
  setSelectedUsers: (owners: SelectOption[]) => void;
}

export const Filters: React.FC<FiltersProps> = ({
  selectedUsers,
  setSelectedUsers,
}) => {
  const [users, setUsers] = useState<SelectOption[]>();

  useEffect(() => {
    getUsersForFilters(setUsers);
  }, []);
  const onChange = (data: any) => {
    setSelectedUsers(data);
  };

  return (
    <div className="filters">
      {users?.length && (
        <>
          <p>Find time slots by Master </p>
          <Select
            className="dropdown"
            value={selectedUsers}
            onChange={onChange}
            options={users}
            isMulti
          />
        </>
      )}
    </div>
  );
};
