import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import UsersList from "./pages/UsersList/UsersList";
import UserPage from "./pages/UserPage/UserPage";
import Registration from "./pages/Registration/Registration";
import { addToken } from "./store";

const privateRoutes = {
  routes: [
    { page: <Registration />, path: "/reg" },
  ],
  redirectAddress: "/reg",
};

const publicRoutes = {
  routes: [
    { page: <UsersList />, path: "/" },
    { page: <UserPage />, path: "/user/:id/" },
  ],
  redirectAddress: "/",
};

const App = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(addToken(user.token));
  }, [])
  const currentRoutes = useMemo(() => {
    if (!token) return privateRoutes;
    return publicRoutes;
  }, [token]);

  return (
    <Routes>
      {currentRoutes.routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.page}
        />
      ))}
      {/* <Route path="/" element={<UsersList />} />
      <Route path="/user/:id/" element={<UserPage />} />
      <Route path="/reg" element={<Registration />} />*/}
      <Route
        path="*"
        replace
        element={<Navigate to={currentRoutes.redirectAddress} />}
      />
    </Routes>
  );
};

export default App;