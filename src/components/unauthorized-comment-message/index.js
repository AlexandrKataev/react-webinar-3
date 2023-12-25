import { memo } from "react";

function UnauthorizedCommentMessage({ onSignIn }) {
  return (
    <div style={{ fontSize: "16px", marginTop: "30px" }}>
      <span
        style={{
          color: "#0087E9",
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={onSignIn}
      >
        Войдите
      </span>
      <span style={{ fontSize: "16px" }}>
        , чтобы иметь возможность комментировать
      </span>
    </div>
  );
}

export default memo(UnauthorizedCommentMessage);
