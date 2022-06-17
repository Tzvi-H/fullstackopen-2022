const notificationStyle = {
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const Notification = ({ message, type }) => {
  if (message === null) return null;

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
