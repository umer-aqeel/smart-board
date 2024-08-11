"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { createAnnouncement } from '@/announcementService';
import styles from "./page.module.scss";
import { useEffect } from 'react';

export default function CreateAnnouncement() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
    };
    fetchUser()
  }, []);
  const onSubmit = async (data) => {
    await createAnnouncement(data);
    router.push('/announcements');
  };

  return (
    <div className={styles.container}>
      <h1>Create Announcement</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label} >Title</label>
          <input className={styles.input} {...register('title')} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// "use client"
// import { useForm } from 'react-hook-form';
// import { useRouter } from 'next/navigation';
// import { createAnnouncement } from '@/announcementService';
// import styles from "./page.module.scss";

// export default function CreateAnnouncement() {
//   const { register, handleSubmit } = useForm();
//   const router = useRouter();

//   const onSubmit = async (data) => {
//     await createAnnouncement(data);
//     router.push('/announcements');
//   };

//   return (
//     <div>
//       <h1>Create Announcement</h1>
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
