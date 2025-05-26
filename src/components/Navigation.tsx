import { Link } from "react-router-dom";

function Navigation({ authUser, signOut }: { authUser?: any, signOut: () => void }) {

  return (
    <div className="fixed w-full py-8 flex items-center justify-center gap-2 text-neutral-50">
      <div className="bg-neutral-800 px-3 py-2 rounded-lg flex gap-2 items-center border-2 border-neutral-700">
        <nav className="flex gap-2">
          <Link to="/" className="px-4 py-2 text-neutral-50 rounded-sm bg-neutral-700 hover:bg-neutral-600">Thread</Link>
          <Link to="/leaderboard" className="px-4 py-2 text-neutral-50 rounded-sm bg-neutral-700 hover:bg-neutral-600">Leaderboard</Link>
        </nav>
        {
          authUser === undefined ? (
            <Link to="/login" className="px-4 py-2 text-red-500 rounded-full font-medium bg-neutral-50 hover:bg-neutral-200">Sign In</Link>
          ) : (
            <button type="button" onClick={signOut} className="px-4 py-2 text-red-500 rounded-full font-medium bg-neutral-50 hover:bg-neutral-200">Sign out</button>
          )
        }
      </div>
    </div>
  );
}

export default Navigation;
