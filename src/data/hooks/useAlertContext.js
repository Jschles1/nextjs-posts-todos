import React from 'react';

const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = React.useState(null);

  // const handlers = React.memo(
  //   () => ({
  //     setSuccessAlert: (message) => {
  //       setAlert({ type: 'success', message });
  //     },
  //     setErrorAlert: (message) => {
  //       setAlert({ type: 'error', message });
  //     },
  //     clearAlert: () => {
  //       setAlert(null);
  //     },
  //   }),
  //   []
  // );

  const handlers = {
    setSuccessAlert: (message) => {
      setAlert({ type: 'success', message });
    },
    setErrorAlert: (message) => {
      setAlert({ type: 'error', message });
    },
    clearAlert: () => {
      setAlert(null);
    },
  };

  return (
    <AlertContext.Provider value={[alert, handlers]}>
      {children}
    </AlertContext.Provider>
  );
};

const useAlertContext = () => React.useContext(AlertContext);

export default useAlertContext;