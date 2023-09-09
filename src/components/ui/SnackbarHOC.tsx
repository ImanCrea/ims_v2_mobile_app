import React, {useState} from 'react';
import {Snackbar} from 'react-native-paper';
import {COLORS} from '../../constants';
//import Slide from "@material-ui/core/Slide";
//import Alert from "@material-ui/lab/Alert";

export const withSnackbar = (WrappedComponent: any) => {
  return (props: any) => {
    const [message, setMessage] = useState("I'm a custom snackbar");
    const [duration, setDuration] = useState(2000);

    const [visible, setVisible] = React.useState(false);
    const onDismissSnackBar = () => setVisible(false);

    const showMessage = (message: string, duration = 2000) => {
      setMessage(message);
      //setSeverity(severity);
      setDuration(duration);
      setVisible(true);
    };

    // const handleClose = (event:any, reason:any) => {
    //     if (reason === "clickaway") {
    //         return;
    //     }
    //     setOpen(false);
    // };

    return (
      <>
        <WrappedComponent {...props} snackbarShowMessage={showMessage} />
        <Snackbar
          style={{backgroundColor: COLORS.gray, zIndex:1}}
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={duration}
          elevation={2}
          action={{
            label: '',
            icon: 'close',
            onPress: () => {
              setVisible(false);
            },
          }}>
          {message}
        </Snackbar>
      </>
    );
  };
};
