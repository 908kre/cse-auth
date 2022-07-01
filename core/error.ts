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
  InvalidNameOrPassword = "InvalidNameOrPassword",
  TokenNotFound = "TokenNotFound",
  InvalidToken = "InvalidToken",
  OwnerNotFound = "OwnerNotFound",
  PermissionDenied = "PermissionDenied",
}
export default ErrorKind;
