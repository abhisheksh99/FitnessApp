import axios from "axios";
import { API_KEY } from "../constants";

const baseUrl = "https://excercisedb.p.rapidapi.com";


// Generic function to make API calls
const apiCall = async (url, params) => {
    try {
        const options = {
            method: "GET",
            url,
            params,
            headers: {
                'x-rapidapi-key': API_KEY, 
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };
        
        const response = await axios.request(options); // Make the API request
        return response.data; // Return the response data

    } catch (error) {
        console.log("Error:", error.message); // Improved error logging
        return null; // Return null in case of error
    }
};

// Function to fetch exercises by body part
export const fetchExercisesByBodyPart = async (bodyPart) => {
    const data = await apiCall(`${baseUrl}/exercises/bodyPart/${bodyPart}`); // Fixed endpoint
    return data; // Return the fetched data
};
