"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { AuthError } from "next-auth";
import { safeParse } from "valibot";

export const login = async (credentials: LoginSchema) => {
  const parsedData = safeParse(LoginSchema, credentials);

  if (!parsedData.success) {
    console.error("Register data is invalid!");
    return {
      data: Object.fromEntries(
        parsedData.issues.map(({ message, path }) => [
          path?.find(Boolean)?.key,
          message,
        ])
      ),
      error: "VALIDATION_ERROR",
      success: false as const,
    };
  }

  try {
    const { email, password } = parsedData.output;

    await signIn("credentials", {
      email,
      password,
      redirectTo: "http://localhost:3000/",
    });

    return {
      success: true as const,
    };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return {
            error: "INVALID_CREDENTIALS",
            success: false as const,
          };
        default:
          return {
            error: "UNKNOWN_AUTH_ERROR",
            success: false as const,
          };
      }
    }

    if (err instanceof Error) {
      return {
        error: err.message,
        success: false as const,
      };
    }

    console.log({ err });
    return {
      error: "UNKNOWN_ERROR",
      success: false as const,
    };
  }
};
