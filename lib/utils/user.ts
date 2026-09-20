import { db } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findFirst({ where: { email } });
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return null;
  }
};

export const checkBlockedEmail = async (email: string) => {
  try {
    const blockedEmail = await db.blockedEmails.findUnique({
      where: { email },
    });
    return Boolean(blockedEmail);
  } catch (error) {
    return false;
  }
};
