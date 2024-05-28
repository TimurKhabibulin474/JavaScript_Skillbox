import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "./components/UserCard";
import UserSelect from "./components/UserSelect";
import Paginator from "../../components/Paginator/Paginator";
import styles from "./UsersList.module.css";
import defaultImg from "../../assets/default.jpg";
const PAGE_SIZE = 9;

const sortingOptions = [
    {
        name: "По имени",
        value: "firstName",
    },
    {
        name: "По фамилии",
        value: "lastName",
    },
];

const imageError = (e) => {
    e.target.onerror = null;
    e.target.src = defaultImg;
}

const UsersList = () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    const [users, setUsers] = useState([]);

    const [filters, setFilters] = useState({
        searching: "",
        page: 1,
        sorting: "",
    });

    function updateFilters(name, value) {
        setFilters({ ...filters, [name]: value });
    }

    useEffect(() => {
        axios
            .get(`https://reqres.in/api/users?per_page=${Number.MAX_SAFE_INTEGER}`)
            .then((res) => res.data)
            .then(({ data }) => {
                setUsers(
                    data.map((userData) => ({
                        ...userData,
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                    }))
                )
            })
            .catch((err) => setUsers([]));
    }, []);

    const filteredSortedUsers = useMemo(() => {
        if (!users.length) return [];
        const { searching, sorting } = filters;
        const result = users.filter(({ firstName, lastName, id }) =>
            `${firstName} ${lastName}`.toLowerCase().includes(searching.toLowerCase()) &&
            id !== currentUser.id
        );
        if (sorting) {
            result.sort((user1, user2) =>
                user1[sorting].localeCompare(user2[sorting])
            );
        }
        return result;
    }, [users, filters]);

    const pagesCount = Math.ceil(filteredSortedUsers.length / PAGE_SIZE);
    const pageIndex = PAGE_SIZE * (filters.page - 1);

    return (
        <div className={styles.container}>
            <div className={styles["user-wrapper"]}>
                <h3>{currentUser.firstname} {currentUser.lastname}</h3>
                <img src={currentUser.avatar} alt="avatar" onError={imageError} className={styles["user-avatar"]} />
                <Link to={`/user/${currentUser.id}`} className={styles["user-link"]}></Link>
            </div>
            <div className={styles.header}>
                <input
                    className={styles["header-input"]}
                    value={filters.searching}
                    onChange={(e) =>
                        setFilters({
                            searching: e.target.value,
                            page: 1,
                            sorting: filters.sorting,
                        })
                    }
                    placeholder="Поиск..."
                />
                <UserSelect
                    options={sortingOptions}
                    activeSorting={filters.sorting}
                    updateSorting={(value) => updateFilters("sorting", value)}
                />
            </div>
            {filteredSortedUsers.length ? (
                <div className={styles["cards-list"]}>
                    {filteredSortedUsers.slice(pageIndex, pageIndex + PAGE_SIZE).map((user) => (
                        <UserCard key={user.id} data={user} />
                    ))}
                </div>
            ) : (
                <h3>Пользователей нет</h3>
            )}
            {pagesCount > 1 && (
                <Paginator
                    activePage={filters.page}
                    updatePage={(button) => updateFilters("page", button)}
                    pagesCount={pagesCount}
                />
            )}
        </div>
    );
};
export default UsersList;