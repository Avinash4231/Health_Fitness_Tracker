// import api from "./Interceptor";

import axios from "axios";
import { BaseURL, getToken } from "../utils";
import { alertSuccess, alertWarning, alertWarningBig } from "../alert";


class API{
    // Authentication and Authorisation API

    async user_auth_login(data) {
        const response = await axios.post(`${BaseURL}/login/`, data);
        console.log(response.data);

        return response;
    }

    async user_auth_logout(email) {
        const response = await axios.post(
            `${BaseURL}/logout/`,
            { email },
            {
                
            }
        );
        return response;
    }

    //Email Sender API
     async email_sender_function( recipientEmail, subject, body )  {
        try {
          await axios.post(`${BaseURL}/api/Users/SendTestMail`, {
            recipientEmail,
            subject,
            body,
          });
      
          return { success: true, message: "OTP sent to your email!" };
        } catch (error) {
          console.error("Error sending OTP:", error);
          return { success: false, message: "Error sending OTP. Please try again." };
        }
      };

     async check_email_exists (email) {
        try {
          const response = await axios.get(`${BaseURL}/email/${email}`);
          return response.data; // Return the response data (assuming the API returns a success status)
        } catch (error) {
          console.error("Error checking email:", error);
          return null; // Return null or handle error accordingly
        }
    }

    async register_user(data, navigate) {
        try {
            const response = await axios.post(`${BaseURL}/api/Users/`, data)
            alertSuccess("User Saved Successfully!!!", navigate, '/users')
            return response.data
        }
        catch (error) {
            alertWarning(error.response.data.error);
        }
    }

    async update_user(userid, data) {
        try {
            // console.log(data);
            
            const response = await axios.put(`${BaseURL}/api/Users/${userid}/`, data
                // , {
                //     headers: {
                //         Authorization: `Bearer ${getToken()}`,
                //     },
                // }
            )
            console.log(response)
            return response.data;
        }
        catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alertWarning(error.response.data.error);
            } else {
                alertWarning('Please try again.');
            }
        }
    }
    

    
    async get_users() {
        try {
            //   console.log(getToken())
            
            const response = await axios.get(`${BaseURL}/api/Users`);
            //     , {
            //         headers: {
            //             Authorization: `Bearer ${getToken()}`,
            //         },
            //     }
            // )
            // console.log(getToken());
            
            return response.data;
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

        
    async get_user(id) {
        try {
          const response = await axios.get(`${BaseURL}/api/Users/${id}`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
            // withCredentials: true, // Ensure credentials are sent with the request
          });
          return response.data;
        } catch (error) {
          console.error("Couldn't fetch data!!!", error);
          alertWarning('Please try again.');
        }
      }
    


    


}


export { API }