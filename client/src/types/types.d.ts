interface SignInPayload {
  email: string;
  password: string;
}
interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}
interface UploadImageData {
  [key: string]: any; // это сигнатура индекса
  file: File;
  upload_preset: string;
  cloud_name: string;
  folder: string;
}
interface UpdateUser {
  _id:string;
  profilePhoto?: string;
  username?: string;
  email?: string;
}
