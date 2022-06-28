import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

// const notificationStyle = {
//   background: "lightgrey",
//   fontSize: 20,
//   borderStyle: "solid",
//   borderRadius: 5,
//   padding: 10,
//   marginBottom: 10,
// };

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) return null;

  const { message, type } = notification;
  const severity = type === "error" ? "error" : "success";

  return <Alert severity={severity}>{message}</Alert>;
};

export default Notification;
