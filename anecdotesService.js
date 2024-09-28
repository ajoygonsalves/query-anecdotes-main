import axios from "axios";

const baseUrl = `http://localhost:3001/anecdotes`;

export const getAnecdotes = async () => {
  try {
    const res = await axios.get(baseUrl);
    return res.data;
  } catch (error) {
    // More specific error handling
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`Server error: ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server. It might be down.");
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up the request: ${error.message}`);
    }
  }
};
