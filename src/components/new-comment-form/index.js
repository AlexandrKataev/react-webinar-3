import { memo, useCallback, useState } from "react";

import "./style.css";

function NewCommentForm({ onSend, type, parentId }) {
  const [text, setText] = useState("");

  const onClickSend = (parentId, type) => {
    onSend(text, parentId, type);
  };

  return (
    <div className="NewCommentForm">
      <div className="NewCommentForm-title">Новый комментарий</div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="NewCommentForm-body"
      />
      <div>
        <button onClick={() => onClickSend(parentId, type)}>Отправить</button>
      </div>
    </div>
  );
}

export default NewCommentForm;
