"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getNewsById, updateNews } from "@/newsService";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { Puff } from "react-loader-spinner";

export default function EditNews() {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
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
          reset(newsItem);
        };
        fetchNews();
      }
    };
    fetchUser()
  }, [id, reset]);

  const onSubmit = async (data) => {
    await updateNews(id, data);
    router.push(`/news/${id}`);
  };

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
    <div className={styles.container}>
      <h1>Edit News</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title")} />
        </div>
        <div>
          <label>Description</label>
          <textarea {...register("description")}></textarea>
        </div>
        <div>
          <label>Date</label>
          <input type="date" {...register("date")} />
        </div>
        <div>
          <label>Image</label>
          <input type="file" {...register("image")} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
