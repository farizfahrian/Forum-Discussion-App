import { postedAt } from "../../utils";
import Chip from "./Chip";
import { useSelector } from "react-redux";
import { useState } from "react";

function ThreadItem({ id, owner, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, onVoteThread }: any) {
    const authUser = useSelector((state: any) => state.authUser);
    const [upVoteActive, setUpVoteActive] = useState(upVotesBy.includes(authUser?.id));
    const [downVoteActive, setDownVoteActive] = useState(downVotesBy.includes(authUser?.id));

    const handleUpVote = () => {
        if (upVoteActive) {
            onVoteThread({threadId: id, voteType: 0});
            setUpVoteActive(false);
        } else {
            onVoteThread({threadId: id, voteType: 1});
            setUpVoteActive(true);
            setDownVoteActive(false);
        }
    }

    const handleDownVote = () => {
        if (downVoteActive) {
            onVoteThread({threadId: id, voteType: 0});
            setDownVoteActive(false);
        } else {
            onVoteThread({threadId: id, voteType: -1});
            setDownVoteActive(true);
            setUpVoteActive(false);
        }
    }

    return (
        <div className="flex flex-col gap-2 max-w-lg bg-neutral-800 text-neutral-100 p-4 rounded-lg">
            <header className="flex justify-between">
                <div className="flex gap-2">
                    <img src={owner.avatar} alt={owner.name} className="w-12 h-12 rounded-full" />
                    <div className="flex flex-col gap-0.5">
                        <p className="text-neutral-50 text-base font-medium">{owner.name.charAt(0).toUpperCase() + owner.name.slice(1)}</p>
                        <p className="text-sm text-neutral-300">{postedAt(createdAt)}</p>
                    </div>
                </div>
                <Chip label={category} />
            </header>
            <div className="my-2">
                <h4 className="text-neutral-300 text-lg font-bold">{title}</h4>
                <article className="text-neutral-300" dangerouslySetInnerHTML={{__html: body}} />
            </div>
            <div className="flex items-center gap-2 justify-between">
                <div className="flex gap-2">
                <button type="button" onClick={handleUpVote} className={`flex items-center justify-center gap-1.5 pl-2 pr-3 py-0.5 rounded-sm border-2 border-neutral-700 ${upVoteActive ? "bg-neutral-50 text-neutral-900" : "text-neutral-50"}`}>
                    <img src={upVoteActive ? "/assets/arrow-up.svg" : "/assets/arrow-up-unactive.svg"} className="w-5 h-5" alt="Upvote" />
                    <p className="text-center font-medium">{upVotesBy.length}</p>
                </button>
                <button type="button" onClick={handleDownVote} className={`flex items-center justify-center gap-1.5 pl-2 pr-3 py-0.5 rounded-sm border-2 border-neutral-700 ${downVoteActive ? "bg-neutral-50 text-neutral-900" : "text-neutral-50"}`}>
                    <img src={downVoteActive ? "/assets/arrow-down.svg" : "/assets/arrow-down.svg"} className="w-5 h-5" alt="Downvote" />
                    <p className="text-center font-medium">{downVotesBy.length}</p>
                </button>
                </div>
                <p className="text-neutral-50 text-sm font-medium">{totalComments > 1 ? `${totalComments} Comments` : `${totalComments} Comment`}</p>
            </div>
        </div>
    );
}

export default ThreadItem;