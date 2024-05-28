import React from "react";
import styles from "./PaginatorButton.module.css"
import classNames from "classnames";

const PaginatorButton = (props) => {
    const { isActive, updatePage, children } = props;
    return (
        <button
            onClick={updatePage}
            className={classNames(styles["paginator-button"], {
                [styles.active]: isActive,
            })}
        >{children}</button>
    );
};

export default PaginatorButton;