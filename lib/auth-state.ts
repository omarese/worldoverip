export type AuthState = {
  error?: string;
  message?: string;
  // Sent back so the form can refill these after an error (never the password).
  values?: { email?: string; username?: string };
};

// Result of the profile / post actions.
export type ActionResult = {
  error?: string;
  message?: string;
};