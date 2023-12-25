import { memo, useEffect, useRef } from "react";

function UnauthorizedReplyMessage({ onSignIn, onCancel, level }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  return (
    <div
      ref={ref}
      style={{
        fontSize: "16px",
        marginTop: "30px",
        marginBottom: "30px",
        marginLeft: level * 30 + "px",
      }}
    >
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
        {", чтобы иметь возможность ответить. "}
      </span>
      <span
        style={{
          color: "#666666",
          textDecoration: "underline",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={onCancel}
      >
        Отмена
      </span>
    </div>
  );
}

export default memo(UnauthorizedReplyMessage);
