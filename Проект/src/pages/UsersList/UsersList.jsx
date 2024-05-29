import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserCard from "../../components/UserCard/UserCard";
import UserSelect from "../../components/UserSelect/UserSelect";
import Paginator from "../../components/Paginator/Paginator";
import styles from "./UsersList.module.css";
import { imageError, getUserLocalStorage } from "../../helpers/utils";
import { sortingOptions } from "../../helpers/constants";
const PAGE_SIZE = 9;

const UsersList = () => {
    const currentUserId = (getUserLocalStorage()).id;
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [filters, setFilters] = useState({
        searching: "",
        page: 1,
        sorting: "",
    });

    function updateUsers(data) {
        setUsers(
            data
                .filter(userData => currentUserId !== userData.id)
                .map((userData) => ({
                    ...userData,
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                }))
        );
    }

    function updateFilters(name, value) {
        setFilters({ ...filters, [name]: value });
    }

    function getData(path, action) {
        axios
            .get(path)
            .then((res) => res.data)
            .then(({ data }) => action(data))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        getData(`https://reqres.in/api/users?per_page=${Number.MAX_SAFE_INTEGER}`, updateUsers);
        getData(`https://reqres.in/api/users/${currentUserId}`, setCurrentUser);
    }, []);

    const filteredSortedUsers = useMemo(() => {
        if (!users.length) return [];
        const { searching, sorting } = filters;
        const result = users.filter(({ firstName, lastName }) =>
            `${firstName} ${lastName}`.toLowerCase().includes(searching.toLowerCase())
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
            {currentUser && (
                <div className={styles["user-wrapper"]}>
                    <h3>{currentUser.first_name} {currentUser.last_name}</h3>
                    <img src={currentUser.avatar} alt="avatar" onError={imageError} className={styles["user-avatar"]} />
                    <Link to={`/user/${currentUser.id}`} className={styles["user-link"]}></Link>
                </div>
            )}
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