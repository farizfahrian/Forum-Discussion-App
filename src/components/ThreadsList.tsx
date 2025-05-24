import { Thread } from "../../utils/api";
import ThreadItem from "./ThreadItem";

function ThreadsList({threads}: {threads: Thread[]}) {
    return (
        <div>
            <h2>Threads List</h2>
            {threads.map((thread) => (
                <ThreadItem key={thread.id} thread={thread} />
            ))}
        </div>
    );
}

export default ThreadsList;
