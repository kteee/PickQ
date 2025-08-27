import { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const AlertSnackbar = ({ message, severity = "info", onClear }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const handleExited = () => {
    onClear?.();
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      onExited={handleExited}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 2 }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
