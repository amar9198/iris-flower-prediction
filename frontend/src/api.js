import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Sends the four measurements to the backend and returns
 * { prediction, probabilities? }.
 * Throws a friendly Error with a `.friendlyMessage` for the UI to show.
 */
export async function predictSpecies(measurements) {
  try {
    const { data } = await client.post("/predict", measurements);
    return data;
  } catch (err) {
    if (err.code === "ECONNABORTED") {
      err.friendlyMessage = "The prediction took too long. Please try again.";
    } else if (!err.response) {
      err.friendlyMessage =
        "Can't reach the prediction server. Make sure the backend is running on port 5000.";
    } else if (err.response.status === 422 || err.response.status === 400) {
      err.friendlyMessage =
        err.response.data?.detail ||
        "Some of the values entered aren't valid. Please check and try again.";
    } else {
      err.friendlyMessage = "Something went wrong while predicting. Please try again.";
    }
    throw err;
  }
}
