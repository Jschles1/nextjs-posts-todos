import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useAlertContext from '../data/hooks/useAlertContext';

const AlertMessage = () => {
  const [alert, { clearAlert }] = useAlertContext();

  if (!alert) {
    return null;
  }

  return <AlertMessageComponent alert={alert} onClose={clearAlert} />;
};

const AlertMessageComponent = React.memo(({ alert, onClose }) => {
  const { message, type } = alert;
  return (
    <Snackbar open={Boolean(alert)} onClose={onClose}>
      <Alert severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default AlertMessage;