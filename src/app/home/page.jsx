"use client";
import Ticker from "@/components/Ticker/page";
// import "../styles/global/globals.scss";
// import "../styles/global/typography.scss";
import Slider from "@/components/Slider/page";
import Header from "@/components/Header/page";
import styles from "./page.module.scss";

export default function HomePage() {
    return (
      <main className={styles.mainWraper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.slider}>
          <Slider />
        </div>
        <div className={styles.ticker}>
          <Ticker />
        </div>
      </main>
    );
  }
