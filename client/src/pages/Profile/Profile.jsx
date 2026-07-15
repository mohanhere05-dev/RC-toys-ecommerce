import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import logo from "../../../public/images/logo.png";
import "./Profile.css";
import ChangePasswordModal from "../../components/ChangePasswordModel/ChangePasswordModal";

const Profile = () => {

    const [user, setUser] = useState(null);
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.get(

                "${import.meta.env.VITE_API_URL}/api/users/profile",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setUser(data);
            setName(data.name);

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to load profile"

            );

        }

    };

    if (!user) {

        return <h2>Loading...</h2>;

    }

    const handleUpdate = async () => {

        try {

            const token = localStorage.getItem("token");

            const { data } = await axios.put(

                "${import.meta.env.VITE_API_URL}/api/users/profile",

                {
                    name,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            toast.success(data.message);

            setUser(data.user);

            localStorage.setItem(

                "user",

                JSON.stringify(data.user)

            );

            setEditing(false);

            window.dispatchEvent(new Event("storage"));

        } catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Update Failed"

            );

        }

    };

    return (

        <>

            <Navbar />

            <div className="profile-page">

                <div className="profile-card">

                    <img
                        src={logo}
                        alt=""
                        className="profile-logo"
                    />

                    <div className="profile-avatar">

                        {user.name.charAt(0).toUpperCase()}

                    </div>

                    {
                        editing ?

                            <input

                                className="edit-name"

                                value={name}

                                onChange={(e) => setName(e.target.value)}

                            />

                            :

                            <h2>{user.name}</h2>

                    }

                    <p>{user.email}</p>

                    <div className="profile-info">

                        <div>

                            <span>Joined</span>

                            <h4>

                                {new Date(
                                    user.createdAt
                                ).toLocaleDateString()}

                            </h4>

                        </div>

                    </div>

                    {
                        editing ?

                            <button
                                className="change-btn"
                                onClick={handleUpdate}
                            >

                                Save Changes

                            </button>

                            :

                            <button
                                className="change-btn"
                                onClick={() => setEditing(true)}
                            >

                                Edit Profile

                            </button>

                    }

                    <button className="change-btn" onClick={() => setShowPasswordModal(true)}>

                        Change Password

                    </button>

                </div>

            </div>

            <ChangePasswordModal
                open={showPasswordModal}
                onClose={() => setShowPasswordModal(false)}
            />

        </>

    );

};

export default Profile;