"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAnnouncementById } from "@/announcementService";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
      if (id) {
        const fetchAnnouncement = async () => {
          const announcementItem = await getAnnouncementById(id);
          setAnnouncement(announcementItem);
        };
        fetchAnnouncement();
      }
    };
    fetchUser()
  }, [id]);

  if (!announcement) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{announcement.title}</h1>
      <p className={styles.announcementDetail}>{announcement.description}</p>
    </div>
  );
}

// "use client";
// import { useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { getAnnouncementById } from '@/announcementService';
// import styles from "./page.module.scss";

// const AnnouncementDetail = () => {
//   const { id } = useParams(); // Correct hook for getting route parameters
//   const [announcement, setAnnouncement] = useState(null);

//   useEffect(() => {
//     if (id) {
//         const fetchAnnouncement = async () => {
//           const announcementItem = await getAnnouncementById(id);
//           setAnnouncement(announcementItem);
//         };
//       fetchAnnouncement();
//       }
//   }, [id]);

//   if (!announcement) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{announcement.title}</h1>
//       <p>{announcement.description}</p>
//     </div>
//   );
// };

// export default AnnouncementDetail;
