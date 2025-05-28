import React from 'react';
import { postedAt } from '../../utils';
import Chip from './Chip';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ThreadItem({ id, owner, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, onVoteThread }) {
  const authUser = useSelector((state) => state.authUser);
  const upVoteActive = upVotesBy.includes(authUser?.id);
  const downVoteActive = downVotesBy.includes(authUser?.id);

  const navigate = useNavigate();
  const handleUpVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    onVoteThread({ threadId: id, voteType: upVoteActive ? 0 : 1 });
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    onVoteThread({ threadId: id, voteType: downVoteActive ? 0 : -1 });
  };

  return (
    <div onClick={() => navigate(`/threads/${id}`)} className="flex flex-col gap-2 p-4 w-full max-w-xl rounded-lg bg-neutral-800 text-neutral-100">
      <header className="flex justify-between">
        <div className="flex gap-4">
          <img src={owner.avatar} alt={owner.name} className="w-12 h-12 rounded-full" />
          <div className="flex flex-col gap-0.5">
            <p className="text-base font-medium text-neutral-50">{owner.name.charAt(0).toUpperCase() + owner.name.slice(1)}</p>
            <p className="text-sm text-neutral-300">{postedAt(createdAt)}</p>
          </div>
        </div>
        <Chip label={category} />
      </header>
      <div className="my-2">
        <h4 className="text-lg font-bold text-neutral-300">{title}</h4>
        <article className="text-neutral-300" dangerouslySetInnerHTML={{ __html: body }} />
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
        <p className="text-sm font-medium text-neutral-50">{totalComments > 1 ? `${totalComments} Comments` : `${totalComments} Comment`}</p>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  onVoteThread: PropTypes.func.isRequired
};

export default ThreadItem;
