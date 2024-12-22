export const validateForm = (
  formState: {name?: string; email: string; password?: string},
  setError: (error: string | null) => void,
): boolean => {
  if (!formState.name || !formState.email || !formState.password) {
    setError('All fields are required');
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formState.email)) {
    setError('Invalid email format');
    return false;
  }
  if (formState.password.length < 8) {
    setError('Password must be at least 8 characters long');
    return false;
  }
  return true;
};
