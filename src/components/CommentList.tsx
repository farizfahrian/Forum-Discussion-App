import { postedAt } from "../../utils";

function CommentList({ comments }: any) {
    return (
        <div>
            <h2 className="text-neutral-50 text-lg font-medium">Comments</h2>
            {comments.map((comment: any) => (
                <div key={comment.id} className="flex gap-2">
                    <img src={comment.owner.avatar} alt={comment.owner.name} className="w-12 h-12 rounded-full" />
                    <div>
                        <p className="text-neutral-50 text-base font-medium">{comment.owner.name.charAt(0).toUpperCase() + comment.owner.name.slice(1)}</p>
                        <p className="text-sm text-neutral-300">{postedAt(comment.createdAt)}</p>
                        <p className="text-neutral-300">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
