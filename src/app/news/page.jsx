"use client";
import { useEffect, useState } from "react";
import { getAllNews, deleteNews } from "@/newsService";
import Link from "next/link";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";


export default function Home() {
  const [news, setNews] = useState([]);
  const router = useRouter();
  const [isLoading , setIsLoading] = useState(false)


  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
      const fetchNews = async () => {
        setIsLoading(true)
        const newsList = await getAllNews();
        setNews(newsList);
        setIsLoading(false)

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

      {
        isLoading ? (
<div className={styles.loaderContainer} >
          <TailSpin color="#662d91" width={30} height={30} />
          <h3 style={{textAlign: 'center'}} >Loading News ....... </h3>
        </div>
        ) : (
          <>
           <ul className={styles.newsList}>
        {news.map((item) => (
          <li key={item._id}>
            <Link href={`/news/${item._id}`}>{item.title}</Link>
            <span style={{display: 'flex' , alignItems: 'center'}} >
              <button
                className={styles.editButton}
                onClick={() => router.push(`news/${item._id}/edit`)}
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
