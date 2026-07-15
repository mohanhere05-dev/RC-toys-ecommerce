import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Users.css";
import { motion } from "framer-motion";

const Users = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const getUsers = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.get(

                "${import.meta.env.VITE_API_URL}/api/users",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setUsers(data);

        } catch (error) {

            toast.error("Failed to Load Users");

        }

    };

    useEffect(() => {

        getUsers();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            const token = localStorage.getItem("token");

            await axios.delete(

                `${import.meta.env.VITE_API_URL}/api/users/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("User Deleted Successfully");

            getUsers();

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Delete Failed"

            );

        }

    };

    return (

        <motion.div className="admin-users"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}>

            <div className="users-header">

                <h1>Users</h1>

                <input
                    type="text"
                    placeholder="Search User..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="table-wrapper">

                <table>

                    <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th>Role</th>

                            <th>Joined</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users
                            .filter((user) =>
                                user.name
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||

                                user.email
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ).map((user) => (

                                <tr key={user._id}>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>

                                        <span
                                            className={
                                                user.isAdmin
                                                    ? "role-admin"
                                                    : "role-user"
                                            }
                                        >
                                            {user.isAdmin ? "Admin" : "User"}
                                        </span>

                                    </td>
                                    <td>

                                        {new Date(user.createdAt).toLocaleDateString()}

                                    </td>

                                    <td>

                                        <button className="delete-btn" onClick={() => handleDelete(user._id)}>
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                            ))}

                    </tbody>

                </table>

            </div>

        </motion.div>

    );

};

export default Users;