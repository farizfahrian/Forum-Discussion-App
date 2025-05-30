import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { asyncAddThread, asyncToggleVoteThread } from '../states/threads/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadsList from '../components/ThreadsList';
import ThreadInput from '../components/ThreadInput';
import CategoryList from '../components/CategoryList';
import PropTypes from 'prop-types';
import React from 'react';

function HomePage() {
  const threads = useSelector((states) => states.threads) || [];
  const users = useSelector((states) => states.users) || [];
  const authUser = useSelector((states) => states.authUser);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onAddThread = (title, body, category) => {
    dispatch(asyncAddThread({ title, body, category }));
  };

  const onVoteThread = ({ threadId, voteType }) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  const threadList = threads
    .filter((thread) => !categoryFilter || thread.category === categoryFilter)
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUser: authUser?.id,
    }));

  const categoryList = [...new Set(threads.map((thread) => thread.category))];

  const onCategoryClick = (category) => {
    setCategoryFilter(category === categoryFilter ? null : category);
  };

  return (
    <section className='pt-32 pb-16 mx-6 min-h-screen bg-neutral-900'>
      <div className='flex flex-col-reverse gap-6 justify-center items-center mx-auto w-full md:items-start md:flex-row'>
        <div className="flex flex-col gap-2 w-full max-w-xl">
          <ThreadInput onAddThread={onAddThread} />
          <ThreadsList threads={threadList} onVoteThread={onVoteThread} />
        </div>
        <CategoryList
          categories={categoryList}
          onCategoryClick={onCategoryClick}
          selectedCategory={categoryFilter}
        />
      </div>
    </section>
  );
}

HomePage.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.object,
  onAddThread: PropTypes.func.isRequired,
  onVoteThread: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func.isRequired
};

export default HomePage;
