import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import styles from "./UserPage.module.css";
import { imageError, getUserLocalStorage, changeUserAPI } from "../../helpers/utils";
import Modal from "../../components/Modal/Modal";
import { addUrl } from "../../store";

const UserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(addUrl(`/user/${id}`));
    }, [])
    const [user, setUser] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const close = useCallback(() => setIsOpen(false), [setIsOpen])
    const changeOldUser = useCallback((user) => {
        setUser(user);
        changeUserAPI(user.id, user);
    }, []);

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users/${id}`)
            .then((res) => res.data)
            .then(({ data }) => setUser(data))
            .catch((err) => console.error(err));
    }, [id]);

    if (!user) return <h3>Загрузка...</h3>

    const { avatar, first_name, last_name, email } = user;

    const currentUserId = (getUserLocalStorage()).id;
    return (
        <>
            <div className={styles.container}>
                <div className={styles["btn-wrapper"]}>
                    <Link to={"/"}>
                        <button className={styles.btn}>На главную</button>
                    </Link>
                    {currentUserId == id && (
                        <button className={styles.btn} onClick={() => setIsOpen(true)}>Редактировать</button>
                    )}
                </div>
                <div>
                    <img src={avatar} alt="avatar" className={styles["user-img"]} onError={imageError} />
                </div>
                <div className={styles["user-info"]}>
                    <h2>{first_name} {last_name}</h2>
                    <p>ID: {id}</p>
                    <p>Email: {email}</p>
                </div>
            </div>
            <Modal isOpen={isOpen} close={close} user={user} changeOldUser={changeOldUser} />
        </>
    );
};

export default UserPage;