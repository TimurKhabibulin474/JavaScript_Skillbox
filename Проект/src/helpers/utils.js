import defaultImg from "../assets/default.jpg";
import axios from "axios";

export const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

export const getUserLocalStorage = () =>  JSON.parse(localStorage.getItem("user"));
export const setUserLocalStorage = (user) => {localStorage.setItem("user", JSON.stringify(user))};
export const changeUserAPI = (id, user) => {
    axios.patch(`https://reqres.in/api/users/${id}`, user);
};