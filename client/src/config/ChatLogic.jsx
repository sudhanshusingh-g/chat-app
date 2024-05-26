export const getSender = (loggedUserId, users) => {
  if (!users || users.length === 0) {
    return ""; // Return an empty string if users array is empty or undefined
  }

  const sender = users.find((user) => user._id !== loggedUserId);
  return sender ? sender.name : "";
};