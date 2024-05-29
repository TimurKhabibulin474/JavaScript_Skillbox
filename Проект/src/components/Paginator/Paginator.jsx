import React, { useMemo } from "react";
import styles from "./Paginator.module.css"
import PaginatorButton from "./PaginatorButton/PaginatorButton";

const Paginator = (props) => {
    const { activePage, updatePage, pagesCount } = props;

    const pagesArray = useMemo(() =>
        Array.from({ length: pagesCount }, (_, i) => i + 1), [pagesCount]
    );

    return (
        <div className={styles.paginator}>
            {pagesArray.map((button) => (
                <PaginatorButton
                    key={button}
                    isActive={activePage === button}
                    updatePage={() => updatePage(button)}
                >
                    {button}
                </PaginatorButton>
            ))}
        </div>
    );
};

export default Paginator;