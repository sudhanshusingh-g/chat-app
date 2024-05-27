export const getSender = (loggedusers, users) => {
   return users[0]?._id === loggedusers?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedusers, users) => {
  return users[0]?._id === loggedusers?._id ? users[1] : users[0].name;
};