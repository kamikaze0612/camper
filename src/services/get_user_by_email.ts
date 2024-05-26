import { db } from "@/database";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.user.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return user;
  } catch (_err) {
    return null;
  }
};
