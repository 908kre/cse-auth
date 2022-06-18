export enum ErrorKind {
  SystemNotFound = "SystemNotFound",
  SystemAlreadyExist = "SystemAlreadyExist",
  RoleNotFound = "RoleNotFound",
  RoleAlreadyExist = "RoleAlreadyExist",
  RoleUserNotFound = "RoleUserNotFound",
  RoleUserAlreadyExist = "RoleUserAlreadyExist",
  RoleGroupNotFound = "RoleGroupNotFound",
  RoleGroupAlreadyExist = "RoleGroupAlreadyExist",
  InvalidSystemIdFormat = "InvalidSystemIdFormat",
  InvalidRoleIdFormat = "InvalidRoleIdFormat",
  InvalidNameOrPassword = "InvalidNameOrPassword"
}
export default ErrorKind;
