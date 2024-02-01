import axios from 'axios';


// Creating an instance of Axios.
const bridge = axios.create(
    {
        timeout: 5000,
        baseURL:'https://api.trello.com/1/boards/BCewJtB2/',
        headers: {
            'Content-Type': 'application/json',
        },
    }
);

// Interceptor to handle responses/errors.
bridge.interceptors.response.use(
    (response) => response, (error) => {

        // Request was canceled, no need to handle it as an error.
        if (axios.isCancel(error)) {
            return Promise.reject(error);
        }

        // Handling response errors.
        else if (error.response) {
            for (const key in error.response.data) {
                if (Array.isArray(error.response.data[key])) {
                    error.response.data[key].forEach(
                        message => console.error(message)
                    );
                } else {
                    console.error(error.response.data[key]);
                }
            }
        }
        
        // Else if the request was made but no response was received.
        // Else something happened in setting up the request that triggered an error.

        else if (error.request) console.error('no response received');
        else console.error("error.message");

        return Promise.reject(error);
    }
);

export default bridge;