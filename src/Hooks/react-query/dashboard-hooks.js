import { useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetCategoryCountQuery = () => {
    return useQuery(["category-count"], async () => {
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/get-category-count/`, {
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

export const useGetRecentTransactionsQuery = () => {
    return useQuery(["recent-transactions"], async () => {
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/get-n-expenditures/5/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });
            // console.log("axios resp: ", res);
            return res.data;
        } catch (err) {
            // console.log("axios err: ", err);
            throw new Error(err.response.data.message);
        }
    });
};

export const useHeatmapInputQuery = () => {
    return useQuery(["heatmap"], async () => {
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/expenditure-heatmap/`, {
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

export const useGetAllExpenseQuery = () => {
    return useQuery(["all-expense"], async () => {
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
export const useGetCategoryByMonthQuery = () => {
    return useQuery(["get-category-by-month"], async () => {
        try {
            const res = await axios.get(`${SERVER_BASE_URL}/get-category-by-month/`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
            });
            // console.log("axios resp: ", res);
            return res.data;
        } catch (err) {
            // console.log("axios err: ", err);
            throw new Error(err.response.data.message);
        }
    });
};

