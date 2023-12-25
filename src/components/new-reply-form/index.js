import { memo, useCallback, useEffect, useRef, useState } from "react";

import "./style.css";

function NewReplyForm({ onSend, type, parentId, onCancel, level }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);
  const [text, setText] = useState("");

  const onClickSend = (parentId, type) => {
    console.log(text);
    onSend(text, parentId, type);
  };

  return (
    <div
      ref={ref}
      className="NewReplyForm"
      style={{ marginLeft: level * 30 + "px" }}
    >
      <div className="NewReplyForm-title">Новый ответ</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="NewReplyForm-body"
      />
      <div className="NewReplyForm-buttons">
        <button onClick={() => onClickSend(parentId, type)}>Отправить</button>
        <button onClick={onCancel}>Отмена</button>
      </div>
    </div>
  );
}

export default NewReplyForm;
