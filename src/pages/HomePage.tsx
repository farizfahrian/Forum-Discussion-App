import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncAddThread, asyncToggleVoteThread } from "../states/threads/action";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import ThreadsList from "../components/ThreadsList";
import { User } from "../../utils/api";
import ThreadInput from "../components/ThreadInput";

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states: any) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads() as any);
  }, [dispatch]);

  const onAddThread = (title: string, body: string, category: string) => {
    dispatch(asyncAddThread({title, body, category}) as any);
  }

  const onVoteThread = ({threadId}: {threadId: string}) => {
    dispatch(asyncToggleVoteThread({threadId}) as any);
  }

  const threadList = threads.map((thread: any) => {
    return {
      ...thread,
      owner: users.find((user: any) => user.id === thread.ownerId) as User,
      authUser: authUser?.id,
    }
  })

  return (
    <section className="home-page">
        <ThreadInput onAddThread={onAddThread} />
        <ThreadsList threads={threadList} onVoteThread={onVoteThread} />
    </section>
  );
}

export default HomePage;
