import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome, {user?.name}!</h1>
      <p>Home page coming soon.</p>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
