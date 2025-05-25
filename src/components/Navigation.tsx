import { Link } from "react-router-dom";

function Navigation({ authUser, signOut }: { authUser: any, signOut: () => void }) {
  const { id, photo, name } = authUser;

  return (
    <div className="bg-neutral-800">
      <img src={photo} alt={id} title={name} />
      <nav>
        <Link to="/">Thread</Link>
        <Link to="/leaderboard">Leaderboard</Link>
      </nav>
      <button type="button" onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Navigation;
