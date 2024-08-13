"use client";
import { useEffect, useState } from "react";
import { getAllAnnouncements, deleteAnnouncement } from "@/announcementService";
import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loader-spinner";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";


export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading , setIsLoading] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }

      const fetchAnnouncements = async () => {
      setIsLoading(true)

        const announcementList = await getAllAnnouncements();
        setAnnouncements(announcementList);
      setIsLoading(false)

      };

      fetchAnnouncements();

    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    await deleteAnnouncement(id);
    setAnnouncements(announcements.filter((item) => item._id !== id));
  };

 

  return (
    


    <div className={styles.container}>
      <h1 className={styles.title}>Announcements List</h1>
      <Link href="/announcements/create" className={styles.createNewsLink}>
        Create Announcement
      </Link>
     {
      isLoading ? (

        <div className={styles.loaderContainer} >
          <TailSpin color="#662d91" width={30} height={30} />
          <h3 style={{textAlign: 'center'}} >Loading Announcements ....... </h3>
        </div>
      ) : (
        <>
         <ul className={styles.announcementList}>
        {announcements.map((item) => (
          <li key={item._id}>
            <Link href={`/announcements/${item._id}`}>{item.title}</Link>
            <span style={{display: 'flex' , alignItems: 'center'}} >
              <button
                className={styles.editButton}
                onClick={() => router.push(`announcements/${item._id}/edit`)}
              >
<MdEdit size={20} />
              </button>
              <button className={styles.button} onClick={() => handleDelete(item._id)}><FaRegTrashAlt size={20} /></button>
            </span>
          </li>
        ))}
      </ul>
        </>
      )
     }
    </div>
  );
}

// "use client"
// import { useEffect, useState } from 'react';
// import { getAllAnnouncements, deleteAnnouncement } from '@/announcementService';
// import Link from 'next/link';
// import styles from "./page.module.scss";

// export default function Announcements() {
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       const announcementList = await getAllAnnouncements();
//       setAnnouncements(announcementList);
//     };
//     fetchAnnouncements();
//   }, []);

//   const handleDelete = async (id) => {
//     console.log(id);
//     await deleteAnnouncement(id);
//     setAnnouncements(announcements.filter(item => item._id !== id));
//   };

//   return (
//     <div>
//       <h1>Announcements List</h1>
//       <Link href="/announcements/create">Create Announcement</Link>
//       <ul>
//         {announcements.map((item) => (
//           <li key={item._id}>
//             <Link href={`/announcements/${item._id}`}>{item.title}</Link>
//             <button onClick={() => handleDelete(item._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
