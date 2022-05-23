export const checkIsCredsValid = (
  email?: string,
  password?: string,
  minPassValue?: number
): Boolean => {
  if (!email || !password) return false;

  if (minPassValue && password.length < minPassValue) return false;

  return true;
};
