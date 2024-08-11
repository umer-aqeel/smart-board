"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login"); // Redirect to login if not authenticated
        return;
      }
      try {
        const { data } = await axios.get("http://localhost:5000/users", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setUsers(data);
      } catch (error) {
        console.error(error);
        alert("You Don't have Admin Right");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [router]);

  const deleteUser = async (id) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    try {
      await axios.delete(`http://localhost:5000/users/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); 
    router.push("/login");
  };
  const handleNews = () => {
    router.push("/news"); 
  };
  const handleAnnouncements = () => {
    router.push("/announcements"); 
  };

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <div className={styles.adminContainer}>
      <h2 className={styles.header}>Admin Panel</h2>
      <div className={styles.row}>
        <div>
          <button className={styles.button} onClick={handleNews}>
            News
          </button>
          <button className={styles.button} onClick={handleAnnouncements}>
            Announcement
          </button>
          {/* <button className={styles.button} onClick={handleAnnouncements}>
            asddas
          </button> */}
        </div>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <ul className={styles.userList}>
        <h2 className={styles.header}>User Management</h2>
        {users.map((user) => (
          <li key={user._id} className={styles.userItem}>
            {user.username} ({user.role})
            <span>
              <button
                className={styles.editButton}
                onClick={() => router.push(`/${user._id}`)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import styles from "./page.module.scss";

// export default function Admin() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const router = useRouter(); // Use the router hook

//     useEffect(() => {
//         const fetchUsers = async () => {
//             const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//             if (!userInfo) {
//                 router.push('/login'); // Redirect to login if not authenticated
//                 return;
//             }

//             try {
//                 const { data } = await axios.get('http://localhost:5000/users', {
//                     headers: { Authorization: `Bearer ${userInfo.token}` },
//                 });
//                 setUsers(data);
//             } catch (error) {
//                 console.error(error);
//                 alert('Failed to load users');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsers();
//     }, [router]);

//     const deleteUser = async (id) => {
//         const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//         try {
//             await axios.delete(`http://localhost:5000/users/${id}`, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });
//             setUsers(users.filter((user) => user._id !== id));
//             alert('User deleted');
//         } catch (error) {
//             console.error(error);
//             alert('Failed to delete user');
//         }
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('userInfo'); // Remove user info from local storage
//         router.push('/login'); // Redirect to login page
//     };

//     if (loading) {
//         return <p className={styles.loading}>Loading...</p>;
//     }

//     return (
//         <div className={styles.adminContainer}>
//             <h2 className={styles.header}>User Management</h2>
//             <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
//             <ul className={styles.userList}>
//                 {users.map((user) => (
//                     <li key={user._id} className={styles.userItem}>
//                         {user.username} ({user.role})
//                         <button className={styles.deleteButton} onClick={() => deleteUser(user._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
