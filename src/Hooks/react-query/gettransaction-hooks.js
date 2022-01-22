import { useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetAllTransacQuery = () => {
    return useQuery(["getall-transa"], async () => {
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/allexpenditures/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });
            // // console.log("axios resp: ", res);
            return res.data;
        } catch (err) {
            // console.log("axios err: ", err);
            throw new Error(err.response.data.message);
        }
    });
};
