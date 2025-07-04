import React from "react";
import styles from "./dashboard.module.css";
import { Link } from "react-router-dom";
import BottomNav from "../BottomNav/";
import coursesIcon from "../../assets/courses-pink.svg";
import newCourse from "../../assets/newCourse.svg";
import bell from "../../assets/bell.svg";

const Dashboard = () => {
  return (
    <div className={styles.dashContainer}>
      <header className={styles.header}>
        <p>Welcome to</p>
        <h1>Grade Calculator</h1>
      </header>

      <section className={styles.coursesSection}>
        <div className={styles.sectionTitle}>
          <img src={coursesIcon} alt="Courses icon" className={styles.iconCourse} />
          <h2>Courses</h2>
        </div>
        <div className={styles.courseList}>
          <div className={styles.courseItem}>
            <span className={styles.dotPink}></span>
            Systems Analysis and Development
          </div>
          <div className={styles.courseItem}>
            <span className={styles.dotPurple}></span>
            Multiplatform Software Development
          </div>
        </div>
      </section>

      <section className={styles.actionsSection}>
        <button className={styles.newCourseBtn}>
          <img src={newCourse} alt="New Course" className={styles.iconNew} />
        </button>
        <div className={styles.notificationBox}>
          <img src={bell} alt="bell" className={styles.iconBell} />
          <p>Great job! Your grades are above average.</p>
        </div>
      </section>

      <section className={styles.performanceSection}>
        <h3>Overall performance</h3>
        <div className={styles.chartPlaceholder}>
          {/* Aqui entraria o gráfico */}
        </div>
      </section>
        <BottomNav />
    </div>
  );
};

export default Dashboard;
