import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const id = useParams().id;
  const user = useSelector(
    (state) => state.users && state.users.find((u) => u.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(({ title }) => (
          <li key={title}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
