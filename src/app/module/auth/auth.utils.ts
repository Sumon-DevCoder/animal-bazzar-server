import bcrypt from "bcrypt";

export const isPasswordMatched = (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatched = bcrypt.compare(plainPassword, hashedPassword);
  return isMatched;
};
