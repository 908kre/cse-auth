import React from "react";
import { ConfirmModal } from ".";
import { action } from "@storybook/addon-actions";

export default {
  title: "ConfirmModal",
  component: ConfirmModal,
};

export const Default = (props) => {
  const [isActive, setIsActive] = React.useState(true);

  return (
    <div>
      <div className="button" onClick={() => setIsActive(!isActive)}>
        button{" "}
      </div>

      <ConfirmModal
        isActive={isActive}
        message={"ユーザーを削除しますか？"}
        title={"警告"}
        onSubmit={action("submit")}
        onClose={() => setIsActive(false)}
      />
    </div>
  );
};
