import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./UserPage.module.css";
import defaultImg from "../../assets/default.jpg";

const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

const UserPage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then(({ data }) => setUser(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!user) return <h3>Загрузка...</h3>

    const { avatar, first_name, last_name, email } = user;

    const currentUserId = (JSON.parse(localStorage.getItem("user"))).id;
    return (
        <div className={styles.container}>
            <div className={styles["btn-wrapper"]}>
                <Link to={"*"}>
                    <button className={styles.btn}>На главную</button>
                </Link>
                {currentUserId == id && (
                    <button className={styles.btn}>Редактировать</button>
                )}
            </div>
            <div>
                <img src={avatar} alt="avatar" className={styles["user-img"]} onError={imageError} />
            </div>
            <div className={styles["user-info"]}>
                <h2 className={styles["user-name"]}>{first_name} {last_name}</h2>
                <p className={styles["user-id"]}>ID: {id}</p>
                <p className={styles["user-email"]}>Email: {email}</p>
            </div>
        </div>
    );
};

export default UserPage;