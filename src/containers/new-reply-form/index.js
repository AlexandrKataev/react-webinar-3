import { memo, useCallback, useState } from "react";

import "./style.css";

function NewReplyForm({ onSend, type, parentId, onCancel }) {
  const [text, setText] = useState("");

  const onClickSend = (parentId, type) => {
    console.log(text);
    onSend(text, parentId, type);
  };

  return (
    <div className="NewReplyForm">
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
