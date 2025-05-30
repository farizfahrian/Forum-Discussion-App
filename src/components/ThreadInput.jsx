import useInput from '../hooks/useInput';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ThreadInput({ onAddThread }) {
  const authUser = useSelector((state) => state.authUser);
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  function onSubmit() {
    if (!authUser) {
      alert('Please sign in first');
      return;
    }
    if (body.trim()) {
      onAddThread(title, body, category);
    }
  }

  function onBodyChange(event) {
    setBody(event.target.value);
  }

  return (
    <div className="flex flex-col gap-2 p-4 w-full rounded-lg bg-neutral-800">
      <input type="text" placeholder="Title" value={title} onChange={onTitleChange} className="block px-4 py-2 w-full rounded-md bg-neutral-700 placeholder-neutral-400 text-neutral-300" />
      <input type="text" placeholder="Category" value={category} onChange={onCategoryChange} className="block px-4 py-2 w-full rounded-md bg-neutral-700 placeholder-neutral-400 text-neutral-300" />
      <textarea placeholder="Body" value={body} onChange={onBodyChange} className="block px-4 py-2 w-full rounded-md bg-neutral-700 placeholder-neutral-400 text-neutral-300"></textarea>
      <button type="submit" onClick={onSubmit} className="px-4 py-2 w-full rounded-md bg-neutral-100 text-neutral-700 hover:bg-neutral-200">Add Thread</button>
    </div>
  );
}

ThreadInput.propTypes = {
  onAddThread: PropTypes.func.isRequired
};

export default ThreadInput;
