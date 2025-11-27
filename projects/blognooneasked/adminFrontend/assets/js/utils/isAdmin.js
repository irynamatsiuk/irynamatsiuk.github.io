export function isAdmin(user) {
  return !!user && user.role === "ADMIN";
}

// !!user - prevents errors if user is null or undefined
