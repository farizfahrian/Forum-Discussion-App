import { useNavigate } from "react-router-dom";
import { postedAt } from "../../utils";

function ThreadItem({ id, owner, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments }: any) {
    const navigate = useNavigate();

    function onClick() {
        navigate(`/thread/${id}`);
    }
    return (
        <div onClick={onClick} className="flex flex-col gap-2 w-[500px] bg-neutral-800 text-neutral-100 p-4 rounded-lg">
            <img src={owner.avatar} alt={owner.name} className="w-12 h-12 rounded-full" />
            <p>{owner.name}</p>
            <p>{title}</p>
            <article dangerouslySetInnerHTML={{__html: body}} />
            <p>{category}</p>
            <p>{upVotesBy.length}</p>
            <p>{downVotesBy.length}</p>
            <p>{totalComments}</p>
            {postedAt(createdAt)}
        </div>
    );
}

export default ThreadItem;