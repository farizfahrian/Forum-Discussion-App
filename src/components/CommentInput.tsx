import useInput from "../hooks/useInput";
import { useSelector } from "react-redux";

function CommentInput({onAddComment}: {onAddComment: (content: string) => void}) {
    const authUser = useSelector((state: any) => state.authUser);
    const [content, setContent] = useInput('');

    function onSubmit() {
        if (!authUser) {
            alert("Please sign in first");
            return;
        }
        if (content.trim()) {
            onAddComment(content);
        }
    }
    return (
        <div>
            <h2>Comment Input</h2>
            <form onSubmit={onSubmit}>
                <input type="text" value={content} onChange={setContent} />
                <button type="button" onClick={onSubmit}>Add Comment</button>
            </form>
        </div>
    );
}

export default CommentInput;