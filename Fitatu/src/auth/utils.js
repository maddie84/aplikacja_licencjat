export const validatePassword = (password, confirmPassword) => {
    let isValid = true;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        isValid = false;
      }
    }
    return isValid;
  };