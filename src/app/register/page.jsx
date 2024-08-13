"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss";
import 'react-toastify/dist/ReactToastify.css';

import SSUET_Logo from '../../../public/img/SSUET_Logo.png';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading , setIsLoading] = useState(false)
    const [role, setRole] = useState('user');
    const router = useRouter();

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const { data } = await axios.post('https://smart-board-backend.vercel.app/users/register', { username, password, role });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success("Registration Succesful" , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: 'Bounce',
                });
        setIsLoading(false)

            router.push('/admin');
        } catch (error) {
        setIsLoading(false)

            console.error(error);
            toast.error(error.response?.data?.message || "Registration failed" , {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: 'Bounce',
                });
        }
    };
    function onLogin() {
        router.push("/login");
    }
    return (
        <div className={styles.container}>
            <div className={styles.authcard} >
                <Image style={{ marginTop: '10px' }} width={120} height={120} alt="ssuet_logo" src={SSUET_Logo} />
                <h3 className={styles.header}>Smart Board - Register</h3>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                    disabled={isLoading}
                        className={styles.input}
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                    disabled={isLoading}

                        className={styles.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {/* <select
                    className={styles.select}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select> */}
                    <button className={styles.button} type="submit">
                    {isLoading ? (
              <>
                <ColorRing
                  visible={true}
                  height="25"
                  width="25"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
                />
                Registering ....
              </>
            ) : (
              <>

                Register
              </>
            )}
                    </button>
                </form>
                <span>
                    <small style={{ margin: '10px 0px;' }}  >Already have an account ? <b style={{ cursor: 'pointer' }} onClick={onLogin} > Login here</b> </small>

                </span>
            </div>
            <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
transition="Bounce"
/>
        </div>
    );
}
