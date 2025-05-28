import React from 'react';

import { postedAt } from '../../utils';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CommentItem({ id, owner, content, createdAt, upVotesBy, downVotesBy, onVoteComment }) {
  const authUser = useSelector((state) => state.authUser);
  const upVoteActive = upVotesBy.includes(authUser?.id);
  const downVoteActive = downVotesBy.includes(authUser?.id);

  const handleUpVote = () => {
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    onVoteComment({ commentId: id, voteType: upVoteActive ? 0 : 1 });
  };

  const handleDownVote = () => {
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    onVoteComment({ commentId: id, voteType: downVoteActive ? 0 : -1 });
  };

  return (
    <div key={id} className="flex flex-col gap-4 p-4 mb-2 rounded-lg border bg-neutral-800 border-neutral-700">
      <div className="flex gap-4">
        <img src={owner.avatar} alt={owner.name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="text-base font-medium text-neutral-50">{owner.name.charAt(0).toUpperCase() + owner.name.slice(1)}</p>
          <p className="text-xs font-medium text-neutral-400">{postedAt(createdAt)}</p>
          <p className="mt-2 text-neutral-300" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <div className="flex gap-2">
          <button type="button" onClick={handleUpVote} className={`flex items-center justify-center gap-1.5 pl-2 pr-3 py-0.5 rounded-sm border-2 border-neutral-700 ${upVoteActive ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-50'}`}>
            <img src={upVoteActive ? '/assets/arrow-up.svg' : '/assets/arrow-up-unactive.svg'} className="w-5 h-5" alt="Upvote" />
            <p className="font-medium text-center">{upVotesBy.length}</p>
          </button>
          <button type="button" onClick={handleDownVote} className={`flex items-center justify-center gap-1.5 pl-2 pr-3 py-0.5 rounded-sm border-2 border-neutral-700 ${downVoteActive ? 'bg-neutral-50 text-neutral-900' : 'text-neutral-50'}`}>
            <img src={downVoteActive ? '/assets/arrow-down.svg' : '/assets/arrow-down.svg'} className="w-5 h-5" alt="Downvote" />
            <p className="font-medium text-center">{downVotesBy.length}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onVoteComment: PropTypes.func.isRequired
};

export default CommentItem;
