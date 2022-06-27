import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <div>
      <h1>Users</h1>
      {users && (
        <table>
          <thead>
            <tr>
              <th></th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
