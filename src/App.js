import React, { useEffect, useRef } from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import "./App.css";

import withOnlineStatus from "./withOnlineStatus";

const StatusMap = {
  ONLINE: "Online",
  OFFLINE: "Offline"
};

const App = ({ isOnline, exactOnlineStatus }) => {
  const refFirstRender = useRef(true);

  useEffect(() => {
    if (refFirstRender.current) {
      refFirstRender.current = false;
      return;
    }

    NotificationManager.info(isOnline ? StatusMap.ONLINE : StatusMap.OFFLINE);
  }, [isOnline]);

  return (
    <>
      <div className={exactOnlineStatus ? "online" : "offline"}>
        {exactOnlineStatus ? StatusMap.ONLINE : StatusMap.OFFLINE}
        <NotificationContainer />
      </div>
    </>
  );
};

export default withOnlineStatus(App);
