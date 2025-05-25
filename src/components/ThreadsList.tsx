import { Thread } from "../../utils/api";
import ThreadItem from "./ThreadItem";

function ThreadsList({threads, onVoteThread}: {threads: Thread[], onVoteThread: (threadId: any) => void}) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <h2>Threads List</h2>
            <div className="flex flex-col gap-2">
                {threads.map((thread) => (
                    <ThreadItem key={thread.id} {...thread} onVoteThread={onVoteThread} />
                ))}
            </div>
        </div>
    );
}

export default ThreadsList;
