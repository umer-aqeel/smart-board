"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getNewsById } from "@/newsService";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { Puff } from "react-loader-spinner";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
      if (id) {
        const fetchNews = async () => {
          const newsItem = await getNewsById(id);
          setNews(newsItem);
        };
        fetchNews();
      }
    };
    fetchUser()
  }, [id]);

  if (!news) {
    return (
      <>
      <div className={styles.loaderContainer} >
      <Puff
  visible={true}
  height="150"
  width="150"
  color="#662d91"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
      </>
    )
  }

  return (
    <div className={styles.newsDetailContainer}>
      <h1 className={styles.newsDetailTitle}>{news.title}</h1>
      <p className={styles.newsDetailDescription}>{news.description}</p>
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className={styles.newsDetailImage}
        />
      )}
      <p className={styles.newsDetailDate}>
        {new Date(news.date).toLocaleDateString()}
      </p>
    </div>
  );
}

// "use client";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { getNewsById } from "@/newsService";

// export default function NewsDetail() {
//   const { id } = useParams();
//   const [news, setNews] = useState(null);

//   useEffect(() => {
//     if (id) {
//       const fetchNews = async () => {
//         const newsItem = await getNewsById(id);
//         setNews(newsItem);
//       };
//       fetchNews();
//     }
//   }, [id]);

//   if (!news) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{news.title}</h1>
//       <p>{news.description}</p>
//       <img src={news.image} alt={news.title} />
//       <p>{new Date(news.date).toLocaleDateString()}</p>
//     </div>
//   );
// }
