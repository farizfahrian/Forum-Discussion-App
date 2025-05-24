import { Thread } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../../utils";

function ThreadItem({ thread }: { thread: Thread }) {
    const navigate = useNavigate();

    function onClick() {
        navigate(`/thread/${thread.id}`);
    }
    return (
        <div onClick={onClick} className="flex flex-col gap-2 bg-neutral-900 p-4 rounded-lg">
            <p>{thread.title}</p>
            <p>{thread.body}</p>
            <p>{thread.category}</p>
            <p>{thread.upVotesBy.length}</p>
            <p>{thread.downVotesBy.length}</p>
            <p>{thread.totalComments}</p>
            created at {postedAt(thread.createdAt)}
        </div>
    );
}

export default ThreadItem;