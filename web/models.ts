// import { Moment } from "moment";
import { Map, List } from "immutable";
import Role from '@csea/core/role';
export type { Role } from '@csea/core/role';
import System from '@csea/core/system';
export type { System } from '@csea/core/system';
import RoleUser from '@csea/core/roleUser';
export type { RoleUser } from '@csea/core/roleUser';
import RoleGroup from "../core/roleGroup"
export type { RoleGroup } from "../core/roleGroup"

import { SystemStore, RoleStore } from "@csea/core";

export type Systems = Map<string, System>

export type Roles = Map<string, Role>

export type RoleUsers = Map<string, RoleUser>

export type RoleGroups = Map<string, RoleGroup>

export const Post=(x:number) => {
    if (9999 >= x && x>=9990) {
        return "一般職"
    }
}