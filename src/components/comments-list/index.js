import { memo } from "react";
import PropTypes from "prop-types";
import Item from "../item";

import Spinner from "../spinner";

function CommentsList({ children, waiting, count }) {
  return (
    <div style={{ padding: "25px 40px" }}>
      <Spinner active={waiting}>
        <div style={{ fontSize: "24px" }}>
          Комментарии{`(${waiting ? "загрузка" : count})`}
        </div>

        {children}
      </Spinner>
    </div>
  );
}

export default memo(CommentsList);
