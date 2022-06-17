import React from "react";
// import { useTranslation } from "react-i18next";

export default function SaveBtn(props) {
  //const { t } = useTranslation();
  return (
    <div className="button is-info" {...props}>
      {("保存")}
    </div>
  );
}
