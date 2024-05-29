import React from "react";
import styles from "./UserSelect.module.css";

const UserSelect = (props) => {
    const { options, updateSorting, activeSorting } = props;
    return (
        <select
            className={styles.select}
            value={activeSorting}
            onChange={(e) => updateSorting(e.target.value)}
        >
            <option disabled value="">
                Выберите из списка...
            </option>
            {
                options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))
            }
        </select>
    );
};
export default UserSelect;