export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function isAdmin() {
  const user = getUser();
  return user?.user_id === 1;
}