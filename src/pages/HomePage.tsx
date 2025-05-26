import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncAddThread, asyncToggleVoteThread } from "../states/threads/action";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import ThreadsList from "../components/ThreadsList";
import { User } from "../../utils/api";
import ThreadInput from "../components/ThreadInput";
import { Thread } from "../../utils/api";

function HomePage() {
  const threads: Thread[] = useSelector((states: any) => states.threads) || [];
  const users: User[] = useSelector((states: any) => states.users) || [];
  const authUser = useSelector((states: any) => states.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads() as any);
  }, [dispatch]);

  const onAddThread = (title: string, body: string, category: string) => {
    dispatch(asyncAddThread({title, body, category}) as any);
  }

  const onVoteThread = ({threadId, voteType}: {threadId: string, voteType: number}) => {
    dispatch(asyncToggleVoteThread({threadId, voteType}) as any);
  }

  const threadList = threads.map((thread: Thread) => {
    return {
      ...thread,
      owner: users.find((user: User) => user.id === thread.ownerId) as User,
      authUser: authUser?.id,
    }
  })

  return (
    <section className="bg-neutral-900 pt-32 pb-16">
        {
          authUser === undefined ? (
            <>
              <ThreadsList threads={threadList} onVoteThread={onVoteThread} />
            </>
          ) : (
            <>
              <ThreadInput onAddThread={onAddThread} />
              <ThreadsList threads={threadList} onVoteThread={onVoteThread} />
            </>
          )
        }
    </section>
  );
}

export default HomePage;
