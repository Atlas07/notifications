import React, { useState, useRef } from "react";

import OnlineStatusMock from "./OnlineStatusMock";

const TIMEOUT = 2000;

const withOnlineStatus = (WrappedComponent) => (props) => {
  const refTimer = useRef(null);
  const [isOnline, setIsOnline] = useState(false);
  const [exactOnlineStatus, setExactOnlineStatus] = useState(false);

  const handleIsOnlineChange = (newOnlineStatus) => {
    setExactOnlineStatus(newOnlineStatus);

    if (newOnlineStatus === false && isOnline === true) {
      refTimer.current = setTimeout(() => {
        setIsOnline(newOnlineStatus);
        refTimer.current = null;
      }, TIMEOUT);
      return;
    }

    if (newOnlineStatus === true && isOnline === true) {
      clearTimeout(refTimer.current);
      return;
    }

    if (
      newOnlineStatus === true &&
      isOnline === false &&
      refTimer.current === null
    ) {
      setIsOnline(newOnlineStatus);
      return;
    }

    setIsOnline(newOnlineStatus);
  };

  return (
    <>
      <OnlineStatusMock onIsOnlineChange={handleIsOnlineChange} />
      <WrappedComponent
        {...props}
        isOnline={isOnline}
        exactOnlineStatus={exactOnlineStatus}
      />
    </>
  );
};

export default withOnlineStatus;
