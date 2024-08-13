"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createNews } from "@/newsService";
import styles from "./page.module.scss";
import { useEffect } from "react";

export default function CreateNews() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!userInfo) {
        router.push("/login");
        return;
      }
    };
    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    await createNews(data);
    router.push("/news");
  };

  return (
    <div className={styles.createNewsContainer}>
      <h1>Create News</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input style={{width: '100%' , padding: '10px' , border: '1px solid #ddd' }} {...register("title", { required: true })} />
          {errors.title && <p className={styles.error}>Title is required</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea {...register("description", { required: true })}></textarea>
          {errors.description && <p className={styles.error}>Description is required</p>}
        </div>
        <div className={styles.formGroup}>
          <label>Date</label>
          <input type="date" {...register("date")} />
        </div>
        <div className={styles.formGroup}>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              validate: {
                isValidType: (files) => {
                  if (!files || files.length === 0) return true; // No file selected
                  const validTypes = ["image/png", "image/jpeg", "image/jpg"];
                  return validTypes.includes(files[0]?.type) || "Unsupported file format. Only PNG, JPG, and JPEG are allowed.";
                },
              },
            })}
          />
          {errors.image && <p className={styles.error}>{errors.image.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
