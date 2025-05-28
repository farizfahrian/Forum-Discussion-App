import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail, asyncToggleVoteThreadDetail, asyncAddThreadComment, asyncToggleVoteComment } from '../states/threadDetail/action';
import React, { useEffect } from 'react';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch, id]);

  const onVoteThread = ({ voteType }) => {
    dispatch(asyncToggleVoteThreadDetail({ threadId: id, voteType: voteType }));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddThreadComment({ threadId: id, content }));
  };

  const onVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncToggleVoteComment({ threadId: id, commentId, voteType }));
  };

  return (
    <section className="pt-32 pb-16 mx-auto max-w-lg min-h-screen">
      {threadDetail && (
        <>
          <ThreadDetail {...threadDetail} onVoteThread={onVoteThread} />
          <CommentInput onAddComment={onAddComment} />
          <CommentList comments={threadDetail.comments} onVoteComment={onVoteComment} />
        </>
      )}
    </section>
  );
}

export default DetailPage;