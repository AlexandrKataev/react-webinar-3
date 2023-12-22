import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useStore from "../../hooks/use-store";
import { useDispatch, useSelector as useReduxSelector } from "react-redux";
import useSelector from "../../hooks/use-selector";

import Spinner from "../../components/spinner";
import commentsActions from "../../store-redux/comments/actions";
import useInit from "../../hooks/use-init";
import shallowequal from "shallowequal";
import Comment from "../../components/comment";

import { buildNestedComments } from "../../utils/comments-tree";
import { useNavigate, useParams } from "react-router-dom";
import NewReplyForm from "../new-reply-form";
import NewCommentForm from "../new-comment-form";

function CommentsList({}) {
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
  }));

  const commentsBulidedTree = useMemo(
    () => buildNestedComments(select.comments),
    [select.comments]
  );

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
      if (text) {
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
    <div style={{ padding: "25px 40px" }}>
      <Spinner active={select.waiting}>
        <div style={{ fontSize: "24px" }}>
          Комментарии{`(${select.waiting ? "загрузка" : select.count})`}
        </div>

        {commentsBulidedTree.map((comment) => (
          <Comment
            key={comment._id}
            userName={comment.author.profile.name}
            text={comment.text}
            date={comment.dateCreate}
            level={comment.level}
            onReply={() => callbacks.onReply(comment._id)}
          >
            {comment._id === currentCommentId && select2.exists && (
              <NewReplyForm
                onSend={callbacks.onSend}
                parentId={currentCommentId}
                type={"comment"}
                onCancel={callbacks.onCancel}
              />
            )}
            {comment._id === currentCommentId && !select2.exists && (
              <div
                style={{
                  fontSize: "16px",
                  marginTop: "30px",
                  marginBottom: "30px",
                }}
              >
                <span
                  style={{
                    color: "#0087E9",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={callbacks.onSignIn}
                >
                  Войдите
                </span>
                <span style={{ fontSize: "16px" }}>
                  {", чтобы иметь возможность ответить. "}
                </span>
                <span
                  style={{
                    color: "#666666",
                    textDecoration: "underline",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                  onClick={callbacks.onCancel}
                >
                  Отмена
                </span>
              </div>
            )}
          </Comment>
        ))}
      </Spinner>
      {select2.exists && (
        <NewCommentForm
          onSend={callbacks.onSend}
          parentId={articleId}
          type={"article"}
        />
      )}
      {!select2.exists && (
        <div style={{ fontSize: "16px", marginTop: "30px" }}>
          <span
            style={{
              color: "#0087E9",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "16px",
            }}
            onClick={callbacks.onSignIn}
          >
            Войдите
          </span>
          <span style={{ fontSize: "16px" }}>
            , чтобы иметь возможность комментировать
          </span>
        </div>
      )}
    </div>
  );
}

export default memo(CommentsList);
