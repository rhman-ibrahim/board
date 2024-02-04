import axios from 'axios';


const responseInterceptor   = (response) => response;
const errorInterceptor      = (error) => {
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
};

// Creating instances of Axios.

const trelloBridge = axios.create(
    {
        timeout: 5000,
        baseURL:'https://api.trello.com/1/boards/BCewJtB2/',
        headers: {
            'Content-Type':'application/json',
        },
    }
);

const GithubBridge = axios.create(
    {
        timeout: 5000,
        baseURL:'https://api.github.com/repos/rhman-ibrahim/',
        headers: {
            'Content-Type':'application/json',
            'Authorization': import.meta.env.VITE_GITHUB_API_TOKEN
        },
    }
);

trelloBridge.interceptors.response.use(responseInterceptor, errorInterceptor);
GithubBridge.interceptors.response.use(responseInterceptor, errorInterceptor);

export const fetchBoard = async (endpoint, rejectWithValue) => {
    try {
        const KEY       = import.meta.env.VITE_TRELLO_API_KEY;
        const TOKEN     = import.meta.env.VITE_TRELLO_API_TOKEN;
        const response  = await trelloBridge.get(`${endpoint}?key=${KEY}&token=${TOKEN}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
};

export const fetchCommits = async endpoint => {
    try {
        const response  = await GithubBridge.get(`${endpoint}/commits`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};