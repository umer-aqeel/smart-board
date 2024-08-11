"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAnnouncementById, updateAnnouncement } from "@/announcementService";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

export default function EditAnnouncement() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
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
          reset(announcementItem);
        };
        fetchAnnouncement();
      }
    };
    fetchUser()
  }, [id, reset]);

  const onSubmit = async (data) => {
    await updateAnnouncement(id, data);
    router.push(`/announcements/${id}`);
  };

  if (!announcement) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h1>Edit Announcement</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label}>Title</label>
          <input className={styles.input} {...register("title")} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// "use client"
// import { useParams } from "next/navigation";
// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { getAnnouncementById, updateAnnouncement} from '@/announcementService';
// import { useRouter } from 'next/navigation';
// import styles from "./page.module.scss";

// export default function EditAnnouncement() {
//   const { id } = useParams();
//   const { register, handleSubmit, reset } = useForm();
//   const [announcement, setAnnouncement] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     if (id) {
//       const fetchAnnouncement = async () => {
//         const announcementItem = await getAnnouncementById(id);
//         setAnnouncement(announcementItem);
//         reset(announcementItem);
//       };
//       fetchAnnouncement();
//     }
//   }, [id, reset]);

//   const onSubmit = async (data) => {
//     await updateAnnouncement(id, data);
//     router.push(`/announcements/${id}`);
//   };

//   if (!announcement) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>Edit Announcement</h1>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <label>Title</label>
//           <input {...register('title')} required />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }
