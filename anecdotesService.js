import axios from "axios";

const baseUrl = `http://localhost:3001/anecdotes`;

const createId = () => {
  return Math.floor(Math.random() * 100000);
};

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

export const createAnecdote = async (content) => {
  try {
    if (content.trim().length <= 5) {
      return response.status(400).json({
        error: "too short anecdote, must have length 5 or more",
      });
    }
    const res = await axios.post(baseUrl, {
      content,
      id: createId(),
      votes: 0,
    });
    return res.data;
  } catch (error) {
    if (error.request)
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

export const removeAnecdote = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`);
    return res.data;
  } catch (error) {
    if (error.request)
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

export const likeAnecdote = async (id) => {
  try {
    const getAnecdote = await axios.get(`${baseUrl}/${id}`);
    const res = await axios.patch(`${baseUrl}/${id}`, {
      votes: getAnecdote.data.votes + 1,
    });
    return res.data;
  } catch (error) {
    if (error.request)
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
