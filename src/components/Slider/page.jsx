"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllNews } from "@/newsService";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function Slider() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const newsList = await getAllNews();
      setNews(newsList);
    };

    fetchNews(); // Initial fetch

    const intervalId = setInterval(fetchNews, 200000); // Fetch news every 6 min

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className={styles.sliderWraper}>
      <div className={styles.title}>
        <h2>Latest News & Events</h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 2,
          },
          1440: {
            slidesPerView: 3,
          },
          2560: {
            slidesPerView: 3,
          },
          3840: {
            slidesPerView: 4, // For 4K screens
          },
          7680: {
            slidesPerView: 5, // For 8K screens
          },
        }}
        className="mySwiper"
      >
        {news.map((item, index) => (
          <SwiperSlide key={index}>
            <div className={styles.slideContent}>
              <div className={styles.imgWraper}>
                <img className={styles.img} src={item?.image} alt={item?.title || "News Image"} />
              </div>
              <div className={styles.contentWraper}>
                <h3>{item?.title}</h3>
                <p className="cta">{item?.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
