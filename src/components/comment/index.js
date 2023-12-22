import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";
import { Link } from "react-router-dom";
import { dateFormat } from "../../utils/date-format";

function Comment({
  userName,
  date,
  text,
  children,
  level,
  onReply,
  isCurrentUser,
}) {
  const cn = bem("Comment");

  // const callbacks = {
  //   onAdd: (e) => props.onAdd(props.item._id),
  // };

  return (
    <div style={{ marginLeft: level * 30 + "px" }} className={cn()}>
      <div className={cn("title")}>
        <div
          className={
            isCurrentUser ? cn("title-user-current") : cn("title-user")
          }
        >
          {userName}
        </div>
        <div className={cn("title-date")}>{dateFormat(date)}</div>
      </div>
      <div className={cn("text")}>
        <div>{text}</div>
      </div>
      <a className={cn("button")} onClick={onReply}>
        Ответить
      </a>
      {children}
    </div>
  );
}

export default memo(Comment);
