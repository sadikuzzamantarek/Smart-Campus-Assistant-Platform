/**
 * Generate a random ID (for temporary use, not for database _id)
 * @param {number} length - Length of the ID
 * @returns {string} Random alphanumeric string
 */
export const generateRandomId = (length = 8) => {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
};
