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

export const updateEventStatus = (event) => {
  const now = new Date();
  if (now < event.registrationDeadline) return "upcoming";
  if (now >= event.eventDate && now <= event.eventEndDate) return "running";
  return "closed";
};
