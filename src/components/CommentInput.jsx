import React from 'react';
import useInput from '../hooks/useInput';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function CommentInput({ onAddComment }) {
  const authUser = useSelector((state) => state.authUser);
  const [content, setContent] = useInput('');

  function onSubmit() {
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    if (content.trim()) {
      onAddComment(content);
    }
  }
  return (
    <div>
      <form
        className="flex gap-2 justify-center items-center mt-3 mb-4"
      >
        <textarea
          className="p-2 w-full rounded-lg border border-neutral-700"
          value={content}
          onChange={setContent}
        />
        <button
          className="p-2 h-full rounded-lg border w-fit border-neutral-700 bg-neutral-50 text-neutral-900"
          type="button"
          onClick={onSubmit}
        >
          <img src="/assets/send.svg" className="w-5 h-5" alt="Send" />
        </button>
      </form>
    </div>
  );
}

export default CommentInput;

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired
};
