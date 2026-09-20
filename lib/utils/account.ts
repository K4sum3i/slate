import { db } from "../db";

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.account.findFirst({ where: { userId } });
    return account;
  } catch (error) {
    console.error("Error getting account by user id - getAccountByUserId()");
    return null;
  }
};
