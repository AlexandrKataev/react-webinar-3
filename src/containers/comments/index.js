import { memo, useCallback, useState } from "react";

import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useSelector from "../../hooks/use-selector";

import commentsActions from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";

import NewCommentForm from "../../components/new-comment-form";
import UnauthorizedCommentMessage from "../../components/unauthorized-comment-message";

import CommentsList from "../../components/comments-list";
import RenderComments from "../render-comments";
import commentsTree from "../../utils/comments-tree";

function Comments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleId = useParams().id;

  const [currentCommentId, setCurrentCommentId] = useState(null);

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const select = useReduxSelector(
    (state) => ({
      comments: state.comments.data,
      count: state.comments.count,
      waiting: state.comments.waiting,
    }),
    shallowequal
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const select2 = useSelector((state) => ({
    exists: state.session.exists,
    user: state.session.user,
  }));

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    onReply: useCallback(
      (id) => {
        setCurrentCommentId(id);
      },
      [setCurrentCommentId]
    ),
    onSend: useCallback((text, parentId, type) => {
      if (text.trim()) {
        dispatch(
          commentsActions.create({
            text,
            parent: { _id: parentId, _type: type },
          })
        );
        setCurrentCommentId(null);
      }
    }, []),
    onCancel: useCallback(() => {
      setCurrentCommentId(null);
    }, []),
  };

  return (
    <CommentsList waiting={select.waiting} count={select.count}>
      {select.comments.length > 0 && (
        <RenderComments
          comments={commentsTree(select.comments)}
          currentUserId={select2.user._id}
          level={0}
          currentCommentId={currentCommentId}
          onReply={callbacks.onReply}
          onSend={callbacks.onSend}
          onCancel={callbacks.onCancel}
          isAuth={select2.exists}
          onSignIn={callbacks.onSignIn}
        />
      )}
      {select2.exists && (
        <NewCommentForm
          onSend={callbacks.onSend}
          parentId={articleId}
          type={"article"}
        />
      )}
      {!select2.exists && (
        <UnauthorizedCommentMessage onSignIn={callbacks.onSignIn} />
      )}
    </CommentsList>
  );
}

export default memo(Comments);
