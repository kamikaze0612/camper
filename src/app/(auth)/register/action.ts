"use server";
import bcrypt from "bcryptjs";
import { safeParse } from "valibot";

import { db } from "@/database";
import { user } from "@/database/schemas/user";
import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/services/get_user_by_email";

export const register = async (credentials: RegisterSchema) => {
  const parsedData = safeParse(RegisterSchema, credentials);

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
    const { name, email, password, phoneNumber } = parsedData.output;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: "EMAIL_EXISTING",
        success: false as const,
      };
    }

    await db
      .insert(user)
      .values({
        name,
        email,
        hashedPassword,
        phoneNumber,
      })
      .returning();

    return {
      success: true as const,
      data: {
        email,
        password,
      },
    };
  } catch (err) {
    if (err instanceof Error) {
      console.log(err);
      console.log(err.message);
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
