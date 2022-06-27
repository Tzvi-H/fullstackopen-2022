import { useSelector } from "react-redux";

const notificationStyle = {
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (notification === null) return null;

  const { message, type } = notification;

  return (
    <div
      style={{
        ...notificationStyle,
        ...{ color: type === "error" ? "red" : "green" },
      }}
    >
      {message}
    </div>
  );
};

export default Notification;
