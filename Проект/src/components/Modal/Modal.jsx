import classNames from "classnames";
import React, { useState, useEffect } from "react";
import styles from "./Modal.module.css";

const Modal = React.memo((props) => {
    const { isOpen, close, user, changeOldUser } = props;
    const { id, first_name, last_name, email, avatar } = user;

    const [changeUser, setChangeUser] = useState({
        id,
        first_name,
        last_name,
        email,
        avatar
    });

    useEffect(() => {
        if (isOpen) {
            setChangeUser({
                id,
                first_name,
                last_name,
                email,
                avatar
            });
        }
    }, [isOpen, first_name, last_name, avatar]);

    function updateUser(field, value) {
        setChangeUser((prevState) => ({ ...prevState, [field]: value }));
    }

    const formSubmit = (e) => {
        e.preventDefault();
        changeOldUser(changeUser);
        close();
    }

    return (
        <div onClick={close} className={classNames(styles["modal-container"], { [styles.open]: isOpen })}>
            <form className={styles.modal} onClick={(e) => e.stopPropagation()} onSubmit={formSubmit}>
                <h3>Редактирование данных</h3>
                <input
                    className={styles["modal-input"]}
                    placeholder={user.first_name}
                    value={changeUser.first_name}
                    onChange={(e) => updateUser("first_name", e.target.value)}
                />
                <input
                    className={styles["modal-input"]}
                    placeholder={user.last_name}
                    value={changeUser.last_name}
                    onChange={(e) => updateUser("last_name", e.target.value)}
                />
                <input
                    className={styles["modal-input"]}
                    placeholder={user.avatar}
                    value={changeUser.avatar}
                    onChange={(e) => updateUser("avatar", e.target.value)}
                />
                <button type="submit">Сохранить изменения</button>
            </form>
        </div>
    );
});

export default Modal;