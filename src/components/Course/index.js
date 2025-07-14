import React, { useEffect, useState } from "react";
import styles from "./courses.module.css";

import axios from "axios";
import { useNavigate } from "react-router-dom"; // para navegação ao clicar no card
import editCourse from "../../assets/editCourse.svg";
import deleteCourse from "../../assets/deleteCourse.svg";
import BottomNav from "../BottomNav/";
const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [swipedId, setSwipedId] = useState(null); // id do card aberto no swipe
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://grade-calculator-api-z8km.onrender.com/api/courses/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };

    fetchCourses();
  }, []);

  
  const openSwipe = (id) => setSwipedId(id);
  const closeSwipe = () => setSwipedId(null);

 
  const handleCardClick = (courseId) => {
    if (swipedId) {
      
      closeSwipe();
    } else {
      
      navigate(`/courses/${courseId}`);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Courses</h1>

      {courses.map((course) => {
        const isSwiped = swipedId === course._id;

        return (
          <div key={course._id} className={styles.cardWrapper}>
            {/* Botões de ação ficam fixos atrás do card */}
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => alert("Editar " + course.name)}>
                <img src={editCourse} alt="New Course" className={styles.iconEdit} />
              </button>
              <button className={styles.deleteBtn} onClick={() => alert("Excluir " + course.name)}>
                <img src={deleteCourse} alt="New Course" className={styles.iconDelete} />
              </button>
            </div>

            {/* Card */}
            <div
              className={`${styles.card} ${isSwiped ? styles.cardSwiped : ""}`}
              onClick={() => handleCardClick(course._id)}
              onTouchStart={(e) => (e.currentTarget.touchStartX = e.touches[0].clientX)}
              onTouchMove={(e) => {
                const touchEndX = e.touches[0].clientX;
                const diff = e.currentTarget.touchStartX - touchEndX;
                if (diff > 50) {
                  openSwipe(course._id);
                } else if (diff < -50) {
                  closeSwipe();
                }
              }}
            >
              <div className={styles.courseInfo}>
                <div>
                  <h3 className={styles.courseName}>{course.name}</h3>
                  <p className={styles.universityName}>{course.institution}</p>
                </div>
                <div className={styles.averageSection}>
                  <p className={styles.averageValue}>9.3</p> 
                  <p className={styles.averageLabel}>Period Average</p>
                </div>
              </div>
            </div>
             
          </div>
        );
       
      })}
      <BottomNav />
    </div>
    
  );
};

export default CoursesPage;
