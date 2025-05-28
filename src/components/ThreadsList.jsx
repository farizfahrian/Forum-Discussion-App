import React from 'react';
import ThreadItem from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadsList({ threads, onVoteThread }) {
  return (
    <div className="flex flex-col gap-2 items-center mt-6 w-full">
      <div className="flex flex-col gap-2 justify-center items-center w-full">
        {threads.map((thread) => (
          <ThreadItem key={thread.id} {...thread} threadId={thread.id} onVoteThread={onVoteThread} />
        ))}
      </div>
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  onVoteThread: PropTypes.func.isRequired
};

export default ThreadsList;
