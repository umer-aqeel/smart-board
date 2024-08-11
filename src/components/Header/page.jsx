"use client";
import styles from "./page.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";

export default function Header() {
  const [formattedDate, setFormattedDate] = useState("");
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const currentDate = moment();
      setFormattedDate(currentDate.format("MMMM DD, YYYY"));
      setFormattedTime(currentDate.format("hh:mm"));
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); 

  return (
    <div className={styles.sliderWraper}>
      <div className={styles.imgWraper}>
        <img className="img" src="/img/SSUET-Official-Logo.webp" alt="My Image" />
      </div>
      <div className={styles.dateTime}>
        <p className="cta">{formattedDate}</p>
        <p className="cta">{formattedTime}</p>
      </div>
    </div>
  );
}
