import React, { useState } from "react";
import styles from "./Registration.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToken } from "../../store";
import { setUserLocalStorage } from "../../helpers/utils";
import { INPUTS_CONF } from "../../helpers/constants";

const Registration = () => {
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        avatar: "",
        id: "",
        token: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formSubmit = (e) => {
        e.preventDefault();
        const { email, password } = user;
        axios
            .post("https://reqres.in/api/register", {
                email,
                password,
            })
            .then((response) => {
                if (response.status === 200) {
                    setUserLocalStorage({
                        id: response.data.id,
                        token: response.data.token,
                    })
                    dispatch(addToken(response.data.token));
                    navigate("/");
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Регистрация</h2>
            <form className={styles.form} onSubmit={formSubmit}>
                {INPUTS_CONF.map((item) => (
                    <input
                        key={item.field}
                        type="text"
                        required
                        className={styles.input}
                        placeholder={item.placeholder}
                        value={user[item.field]}
                        onChange={(e) => setUser({
                            ...user,
                            [item.field]: e.target.value,
                        })}
                    />
                ))}
                <button type="submit" className={styles.btn}>Зарегистрироваться</button>
            </form>
        </div>
    );
};

export default Registration;