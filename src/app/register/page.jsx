"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from "./page.module.scss"; // Import the SCSS module

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('https://smart-board-backend.vercel.app/users/register', { username, password, role });
            // console.log(data.token);
            localStorage.setItem('userInfo', JSON.stringify(data));
            alert('Registration successful');
            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.header}>Register</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
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
                <button className={styles.button} type="submit">Register</button>
            </form>
        </div>
    );
}
