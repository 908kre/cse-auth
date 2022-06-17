import React from "react";
//import { observer } from "mobx-react-lite";
import SystemTable from "../../components/System/SystemTable"
import LocationTags from "./LocationTags";
import RoleTags from "../../components/System/RoleTags";
import UserTags from "./UserTags";
import store from "@fpalm-auth/web/store";

const { groupUsecase, } = store;

const Component = () => (
  <SystemTable
    systems={Systems}
    RoleTags={RoleTags}
    LocationTags={LocationTags}
    UserTags={UserTags}
    onEditClick={groupUsecase.init}
    onDeleteClick={groupUsecase.deleteGroup}
    onCreateClick={groupUsecase.init}
    onCloneClick={groupUsecase.cloneGroup}
    isCreateable={groupUsecase.isCreateable}
    isUpdateable={groupUsecase.isUpdateable}
    isDeleteable={groupUsecase.isDeleteable}
  />
);

export default observer(Component);
