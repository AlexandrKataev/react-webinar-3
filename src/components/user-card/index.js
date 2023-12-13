import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function UserCard({ user }) {
  const cn = bem("UserCard");
  return (
    <div className={cn()}>
      <div className={cn("title")}>Профиль</div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Имя:</div>
        <div className={cn("value")}>{user?.profile.name}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>Телефон:</div>
        <div className={cn("value")}>{user?.profile.phone}</div>
      </div>
      <div className={cn("prop")}>
        <div className={cn("label")}>email:</div>
        <div className={cn("value")}>{user?.email}</div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  onAdd: PropTypes.func,
  t: PropTypes.func,
};

UserCard.defaultProps = {
  onAdd: () => {},
  t: (text) => text,
};

export default memo(UserCard);
