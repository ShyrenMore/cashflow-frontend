import { useQuery } from "react-query";
import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export const useGetReminderQuery = () => {
  return useQuery(["get-reminders"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/get-reminders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("axios err : ", err);
      throw new Error(err.response.data.message);
    }
  });
};


export const useGetGoalQuery = () => {
  return useQuery(["get-goals"], async () => {
    try {
      const res = await axios.get(`${SERVER_BASE_URL}/get-goals/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return res.data;
    } catch (err) {
      console.log("axios err : ", err);
      throw new Error(err.response.data.message);
    }
  });
};
// export const useHeatmapInputQuery = () => {
//   return useQuery(["heatmap"], async () => {
//     try {
//       const res = await axios.get(`${SERVER_BASE_URL}/expenditure-heatmap/`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       // console.log("axios resp: ", res);
//       return res.data;
//     } catch (err) {
//       console.log("axios err: ", err);
//       throw new Error(err.response.data.message);
//     }
//   });
// };

// export const useGetAllExpenseQuery = () => {
//   return useQuery(["all-expense"], async () => {
//     try {
//       const res = await axios.get(`${SERVER_BASE_URL}/allexpenditures/`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//         },
//       });
//       // console.log("axios resp: ", res);
//       return res.data;
//     } catch (err) {
//       console.log("axios err: ", err);
//       throw new Error(err.response.data.message);
//     }
//   });
// };
