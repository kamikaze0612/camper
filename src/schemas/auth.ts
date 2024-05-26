import { email, minLength, object, Output, string } from "valibot";

export const LoginSchema = object({
  email: string([email("Email is required")]),
  password: string([minLength(1, "Password is required")]),
});
export type LoginSchema = Output<typeof LoginSchema>;

export const RegisterSchema = object({
  name: string(),
  email: string([email("Email is invalid")]),
  password: string([
    minLength(8, "Password must be consisted of at least 8 characters"),
  ]),
  phoneNumber: string([minLength(8, "Please insert valid phone number")]),
});
export type RegisterSchema = Output<typeof RegisterSchema>;
