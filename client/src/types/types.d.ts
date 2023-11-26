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
  _id: string;
  profilePhoto?: string;
  username?: string;
  email?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
}
interface DataKeys {
  name: string;
  color: string;
}
interface Activities {
  time: string;
  text: string;
}
interface Data {
  name: string;
  visits: number;
  orders?: number;
  clicks?: number;
}
interface ProductCreation {
  title?: string;
  img?: string;
  color?: string;
  producer?: string;
  price?: string;
  user: string;
  inStock?: boolean;
  viewsCount?: number;
  _id: string;
}

