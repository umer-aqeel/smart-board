"use client";
import { useEffect, useState } from 'react';
import { getAllAnnouncements } from '@/announcementService';
import Marquee from "react-fast-marquee";
import styles from "./page.module.scss";

export default function Ticker() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const announcementList = await getAllAnnouncements();
      setAnnouncements(announcementList);
    };

    fetchAnnouncements();

    const intervalId = setInterval(fetchAnnouncements, 60000); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.title}>
        <h2>Updates</h2>
      </div>

      <div className={styles.announcement}>
        <Marquee speed={60} gradient={false}>
          {announcements.map((announcement, index) => (
            <span key={index} className="ctaLg">
              {index > 0 && " • "} 
              {announcement.title}
              {" • "}
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
