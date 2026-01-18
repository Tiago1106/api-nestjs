export interface UpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  oldPassword?: string;
  newPassword?: string;
}