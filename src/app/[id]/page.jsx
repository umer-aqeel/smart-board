"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';
import styles from "./page.module.scss";

export default function EditUser() {
    const [user, setUser] = useState({ username: '', role: '' });
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));

            if (!userInfo) {
                router.push('/login');
                return;
            }

            try {
                const { data } = await axios.get(`https://smart-board-backend.vercel.app/users/${id}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setUser(data);
            } catch (error) {
                console.error(error);
                alert('Failed to load user data');
            }
        };

        fetchUser();
    }, [id, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        try {
            await axios.put(`https://smart-board-backend.vercel.app/users/${id}`, user, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });
            alert('User updated successfully');
            router.push('/admin');
        } catch (error) {
            console.error(error);
            alert('Failed to update user');
        }
    };

    return (
        <div className={styles.editUserContainer}>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Username</label>
                    <input 
                        type="text" 
                        value={user.username} 
                        onChange={(e) => setUser({ ...user, username: e.target.value })} 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Role</label>
                    <select 
                        value={user.role} 
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className={styles.saveButton}>Save</button>
            </form>
        </div>
    );
}
