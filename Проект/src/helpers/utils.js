import defaultImg from "../assets/default.jpg";

export const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

export const getUserLocalStorage = () =>  JSON.parse(localStorage.getItem("user"));
export const setUserLocalStorage = (user) => {localStorage.setItem("user", JSON.stringify(user))}