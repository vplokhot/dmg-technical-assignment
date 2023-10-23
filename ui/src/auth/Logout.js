import { useUser } from "../context/UserContext";

function LogoutButton() {
  const { logout } = useUser();

  const handleLogout = () => {
    logout(); // Call the logout function from the context
  };

  return <button onClick={handleLogout}>Log Out</button>;
}
