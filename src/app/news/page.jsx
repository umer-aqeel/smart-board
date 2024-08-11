"use client";
import { useEffect, useState } from "react";
import { getAllNews, deleteNews } from "@/newsService";
import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
export default function Home() {
  const [news, setNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
      const fetchNews = async () => {
        const newsList = await getAllNews();
        setNews(newsList);
      };
      fetchNews();
    };
    fetchUser();
  }, []);

  const handleDelete = async (id) => {
    await deleteNews(id);
    setNews(news.filter((item) => item._id !== id));
  };

  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>News List</h1>
      <Link href="news/create" className={styles.createNewsLink}>
        Create News
      </Link>
      <ul className={styles.newsList}>
        {news.map((item) => (
          <li key={item._id}>
            <Link href={`/news/${item._id}`}>{item.title}</Link>
            <span>
              <button
                className={styles.editButton}
                onClick={() => router.push(`news/${item._id}/edit`)}
              >
                Edit
              </button>
              <button className={styles.button} onClick={() => handleDelete(item._id)}>Delete</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "use client"
// import { useEffect, useState } from 'react';
// import { getAllNews, deleteNews } from '@/newsService';
// import Link from 'next/link';

// export default function Home() {
//   const [news, setNews] = useState([]);

//   useEffect(() => {
//     const fetchNews = async () => {
//       const newsList = await getAllNews();
//       setNews(newsList);
//     };
//     fetchNews();
//   }, []);

//   const handleDelete = async (id) => {
//     await deleteNews(id);
//     setNews(news.filter(item => item._id !== id));
//   };

//   return (
//     <div>
//       <h1>News List</h1>
//       <Link href="news/create">Create News</Link>
//       <ul>
//         {news.map((item) => (
//           <li key={item._id}>
//             <Link href={`/news/${item._id}`}>{item.title}</Link>
//             <button onClick={() => handleDelete(item._id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
