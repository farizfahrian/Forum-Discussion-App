import React from 'react';
import CommentItem from './CommentItem';
import PropTypes from 'prop-types';

function CommentList({ comments, onVoteComment }) {

  return (
    <div>
      <h2 className="mb-4 text-lg font-medium text-neutral-50">Comments</h2>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} onVoteComment={onVoteComment} />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onVoteComment: PropTypes.func.isRequired
};

export default CommentList;
