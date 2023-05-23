import axios, { Axios } from 'axios';
import { redirect } from 'react-router-dom';

const axiosApiInstance = axios.create(
    {
        baseURL: process.env.REACT_APP_API_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
);



const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken') || null;
    if (refreshToken) {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/authenticate/refresh`,
            {
                clientId: process.env.REACT_APP_CLIENT_ID,
                clientSecret: process.env.REACT_APP_CLIENT_SECRET,
                refreshToken: refreshToken
            }
        );
        if (res.status === 200) {
            localStorage.setItem('accessToken', res.data['accessToken']);
            localStorage.setItem('expiresOn', res.data['expiresOn']);
            return res.data['accessToken'];
        }
    }
    return null;
}

const validateAccessToken = (access_token, expiresOn) => {
    if (access_token) {
        if (new Date(expiresOn) < Date.now()) {
            return false;
        }
        return true;
    }
    return false;

};

const createAccessToken = async () => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/authenticate/generate`,
        {
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET
        }
    );
    if (res.status === 200) {
        localStorage.setItem('accessToken', res.data['accessToken']);
        localStorage.setItem('refreshToken', res.data['refreshToken']);
        localStorage.setItem('expiresOn', res.data['expiresOn']);
        return res.data['accessToken'];
    }
    return null;
}


// Handler for all outgoing requests to add the oauth header and token
axiosApiInstance.interceptors.request.use(async config => {
        const accessToken = localStorage.getItem('accessToken') || null;
        const expiresOn = localStorage.getItem('expiresOn') || null;
        if (accessToken === null) {
            // create the access token
            const new_accessToken = await createAccessToken();
            if (new_accessToken && validateAccessToken(new_accessToken, expiresOn) === true) {
                // set the authorization header
                config.headers['Oauth'] = `${new_accessToken}`;
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = 'application/json';
                //  = {
                //     'oauth': `${new_accessToken}`,
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // };
            }
        } else if (validateAccessToken(accessToken, expiresOn) === false) {
            // refresh the access token
            const new_accessToken = await refreshAccessToken();
            if (new_accessToken) {
                // set the oauth header                
                config.headers['Oauth'] = `${new_accessToken}`;
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = 'application/json';
            }
        } else {
            // set the oauth header
            config.headers['Oauth'] = `${accessToken}`;
                config.headers['Accept'] = 'application/json';
                config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
  error => {
    return Promise.reject(error)
    });

// jwt interceptor
axiosApiInstance.interceptors.request.use(async config => {
    console.log("jwt interceptor");
    console.log("config: ", config.url);
    const targetUrl = config.url;
    const adminPanelBaseUrl = `${process.env.REACT_APP_API_URL}/admin`;
    console.log("targetUrl: ", targetUrl);
    console.log("adminPanelBaseUrl: ", adminPanelBaseUrl);
    if (targetUrl.includes(adminPanelBaseUrl) && (targetUrl !== `${adminPanelBaseUrl}/login`) ) {
        console.log("admin panel hit");
        const jwtToken = localStorage.getItem('jwtToken') || null;
        console.log("jwtToken", jwtToken);
        if (jwtToken) {
            config.headers.Authorization = jwtToken;
            console.log("headers: ", config.headers);
            return config;
        }
        else {
            window.location.href = '/admin/login';
            return Promise.reject("Redirecting to login page");
        }
    }
    return config;
}, error => {
    console.log("error.response: ",error);
    return Promise.reject(error);
});
    

// Handler for 403 errors
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
    const originalRequest = error.config;
    console.log("error.response: ",error);
  if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
    originalRequest._retry = true;
    const accessToken = await refreshAccessToken();            
    axios.defaults.headers.common['oauth'] = accessToken;
    return axiosApiInstance(originalRequest);
  }
  return Promise.reject(error);
});

export default axiosApiInstance;