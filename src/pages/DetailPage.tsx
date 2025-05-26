import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveThreadDetail, asyncToggleVoteThreadDetail, asyncAddThreadComment, asyncToggleVoteComment } from "../states/threadDetail/action";
import { useEffect } from "react";
import ThreadDetail from "../components/ThreadDetail";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";

function DetailPage() {
    const { id } = useParams();
    const threadDetail = useSelector((states: any) => states.threadDetail);
    const threads = useSelector((states: any) => states.threads);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(asyncReceiveThreadDetail(id as string) as any);
    }, [id, dispatch]);

    const onVoteThread = (voteType: number) => {
        dispatch(asyncToggleVoteThreadDetail(id as string, voteType) as any);
    };

    const onAddComment = (content: string) => {
        dispatch(asyncAddThreadComment({threadId: id as string, content}) as any);
    };

    const onVoteComment = ({commentId, voteType}: {commentId: string, voteType: number}) => {
        dispatch(asyncToggleVoteComment({commentId, voteType}) as any);
    };

    console.log(id)
    console.log(threadDetail)
    console.log(threads)

    return (
        <section className="detail-page">
            <p className="text-white">{threadDetail.title}</p>
            {/* <ThreadDetail {...threadDetail} onVoteThread={onVoteThread} /> */}
            {/* <CommentInput onAddComment={handleAddComment} />
            <CommentList comments={threadDetail.comments} onVoteComment={handleVoteComment} /> */}
        </section>
    );
}

export default DetailPage;  