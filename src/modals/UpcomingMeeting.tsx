import React, { Dispatch, SetStateAction } from "react";

interface Props {
  enable: boolean;
  setEnable: Dispatch<SetStateAction<boolean>>;
}
const UpcomingMeeting = ({ enable, setEnable }: Props) => {
  return <div>Upcoming Meeting</div>;
};

export default UpcomingMeeting;
