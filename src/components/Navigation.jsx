import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ authUser, signOut }) {

  return (
    <div className="flex fixed gap-2 justify-center items-center py-8 w-full text-neutral-50">
      <div className="flex gap-2 items-center px-3 py-2 rounded-lg border-2 bg-neutral-800 border-neutral-700">
        <nav className="flex gap-2">
          <Link to="/" className="px-4 py-2 rounded-sm text-neutral-50 bg-neutral-700 hover:bg-neutral-600">Thread</Link>
          <Link to="/leaderboard" className="px-4 py-2 rounded-sm text-neutral-50 bg-neutral-700 hover:bg-neutral-600">Leaderboard</Link>
        </nav>
        {
          !authUser ? (
            <Link to="/login" className="px-4 py-2 font-medium text-red-500 rounded-full bg-neutral-50 hover:bg-neutral-200">Sign in</Link>
          ) : (
            <>
              <p>{authUser.name.charAt(0).toUpperCase() + authUser.name.slice(1)}</p>
              <button type="button" onClick={signOut} title="Sign out" className="px-1 py-2 font-medium rounded-md border-2 text-neutral-50 border-neutral-50 hover:bg-neutral-700 hover:text-neutral-700"><img src="/assets/log-out.svg" alt="Log out" className="w-5 h-5" /></button>
            </>
          )
        }
      </div>
    </div>
  );
}

Navigation.propTypes = {
  /** Authenticated user */
  authUser: PropTypes.object,
  /** Sign out function */
  signOut: PropTypes.func.isRequired
};

export default Navigation;
