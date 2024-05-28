import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserCard.module.css";
import defaultImg from "../../../assets/default.jpg";

const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

const UserCard = (props) => {
    const { id, email, firstName, lastName, avatar } = props.data;
    return (
        <div className={styles.card}>
            <div className={styles["card-img"]}>
                <img src={avatar} alt="avatar" onError={imageError} />
            </div>
            <div className={styles["card-text"]}>
                <p>{firstName} {lastName}</p>
                <p>{email}</p>
            </div>
            <Link to={`/user/${id}`} className={styles["card-link"]}></Link>
        </div>
    )
}

export default UserCard;