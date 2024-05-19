

import axios from "axios";

const fetchChats = async () => {
  try {
    const data = await axios.get("/api/chats");
    return data;
  } catch (error) {
    throw error;
  }
};

const fetchSingleChat = async (id) => {
  try {
    const data = await axios.get(`/api/chats/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { fetchChats, fetchSingleChat };
