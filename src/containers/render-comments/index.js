import Comment from "../../components/comment";
import NewReplyForm from "../../components/new-reply-form";
import UnauthorizedReplyMessage from "../../components/unauthorized-reply-message";

function RenderComments({
  comments,
  level = 0,
  currentUserId,
  currentCommentId,
  onReply,
  onSend,
  onCancel,
  isAuth,
  onSignIn,
}) {
  return (
    <>
      {comments.map((comment) => {
        return (
          <>
            <Comment
              key={comment._id}
              userName={comment.author.profile.name}
              text={comment.text}
              date={comment.dateCreate}
              level={level}
              onReply={() => onReply(comment._id)}
              isCurrentUser={comment.author._id === currentUserId}
            ></Comment>
            {comment.children && comment.children.length > 0 && (
              <RenderComments
                comments={comment.children}
                currentUserId={currentUserId}
                level={level + 1 > 6 ? 7 : level + 1}
                currentCommentId={currentCommentId}
                onReply={onReply}
                onSend={onSend}
                onCancel={onCancel}
                isAuth={isAuth}
                onSignIn={onSignIn}
              />
            )}
            {comment._id === currentCommentId && isAuth && (
              <NewReplyForm
                onSend={onSend}
                parentId={currentCommentId}
                type={"comment"}
                onCancel={onCancel}
                level={level + 1 > 6 ? 7 : level + 1}
              />
            )}
            {comment._id === currentCommentId && !isAuth && (
              <UnauthorizedReplyMessage
                onSignIn={onSignIn}
                onCancel={onCancel}
                level={level + 1 > 6 ? 7 : level + 1}
              />
            )}
          </>
        );
      })}
    </>
  );
}

export default RenderComments;
