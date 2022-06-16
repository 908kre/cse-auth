export enum ErrorKind {
  SystemNotFound = "SystemNotFound",
  SystemAlreadyExist = "SystemAlreadyExist",
  RoleNotFound = "RoleNotFound",
  RoleUserNotFound = "RoleUserNotFound",
  RoleGroupNotFound = "RoleGroupNotFound",
  InvalidSystemNameFormat = "InvalidSystemNameFormat",
  InvalidNameOrPassword = "InvalidNameOrPassword"
}
export default ErrorKind;
