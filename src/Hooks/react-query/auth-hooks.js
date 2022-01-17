import { useQueries, useMutation } from "react-query";
import axios from "axios";
import { useMessages } from "../../context/message.context";
// const SERVER_BASE_URL = "http://localhost:8000/api/v1";
const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL

export const useLoginMutation = () => {
    const { actions } = useMessages();
    const mutation = useMutation(async ({ username, password }) => {
        //   console.debug({ email, password });
        try {
            const resp = await axios.post(`${SERVER_BASE_URL}/auth/token/`, {
                username,
                password,
            });
            console.log("axios resp: ", resp);
            return resp.data;
        } catch (err) {
            console.log("axios error: ", JSON.stringify(err.response.data));
            actions.setMessages("errorMessage", err.response.data.message);
            throw new Error(err.response.data.message);
        }
    });
    return mutation;
};

export const useSignupMutation = () => {
    const { actions } = useMessages();
    const mutation = useMutation(
        async ({ email, password, username, firstname }) => {
            try {
                const resp = await axios.post(`${SERVER_BASE_URL}/auth/register/`, {
                    email,
                    password,
                    username,
                    firstname,
                });
                console.log("axios resp: ", resp);
                // console.log("type: ", typeof resp.data.message);
                actions.setMessages("successMessage", resp.data.MSSG);
                return resp.data;
            } catch (err) {
                console.log("axios error: ", JSON.stringify(err.response.data));
                actions.setMessages("errorMessage", err.response.data.message);
                throw new Error(err.response.data.message);
            }
        }
    );
    return mutation;
};
