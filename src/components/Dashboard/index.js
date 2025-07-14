import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import BottomNav from "../BottomNav/";
import coursesIcon from "../../assets/courses-pink.svg";
import newCourse from "../../assets/newCourse.svg";
import bell from "../../assets/bell.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchSubjectAverages = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token de autenticação não encontrado");
      }

      // 1. Busca todas as matérias
      const subjectsRes = await axios.get(
        "https://grade-calculator-api-z8km.onrender.com/api/subjects",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      console.log("Matérias recebidas:", subjectsRes.data); // Debug
      
      const subjects = subjectsRes.data;
      if (!subjects || subjects.length === 0) {
        console.log("Nenhuma matéria encontrada"); // Debug
        setGradesData([]);
        return;
      }

      // 2. Busca médias para cada matéria
      const averagesPromises = subjects.map(async (subject) => {
        try {
          console.log(`Buscando média para: ${subject.name} (ID: ${subject._id})`); // Debug
          
          const res = await axios.get(
            `https://grade-calculator-api-z8km.onrender.com/api/subjects/${subject._id}/calculate`,
            { 
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          
          console.log("Resposta da média:", { 
            subject: subject.name, 
            data: res.data 
          }); // Debug detalhado
          
          return {
            name: subject.name.substring(0, 20), // Limita o tamanho para o gráfico
            grade: res.data.finalAverage ?? 0, // Usa operador nullish coalescing
            fullData: res.data // Mantém todos os dados para debug
          };
        } catch (err) {
          console.error(`Erro na matéria ${subject.name}:`, {
            error: err.response?.data || err.message,
            subjectId: subject._id
          });
          return null; // Retorna null para ser filtrado depois
        }
      });

      // 3. Processa todas as respostas
      const results = await Promise.all(averagesPromises);
      const validAverages = results.filter(item => item !== null);
      
      console.log("Dados válidos para o gráfico:", validAverages); // Debug final
      
      if (validAverages.length === 0) {
        throw new Error("Nenhuma média válida encontrada");
      }

      setGradesData(validAverages);
      
    } catch (error) {
      console.error("Erro no processo completo:", {
        error: error.message,
        stack: error.stack
      });
      
      setError(error.message);
      
      // Dados de exemplo formatados exatamente como o gráfico espera
      setGradesData([
        { name: "Matemática", grade: 7.5, fullData: null },
        { name: "Português", grade: 8.2, fullData: null },
        { name: "História", grade: 6.9, fullData: null }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Adiciona timeout para evitar chamadas muito rápidas
  const timer = setTimeout(() => {
    fetchSubjectAverages();
  }, 300);

  return () => clearTimeout(timer);
}, []);

  return (
    <div className={styles.dashContainer}>
      <header className={styles.header}>
        <p>Welcome to</p>
        <h1>Grade Calculator</h1>
      </header>

      <section className={styles.coursesSection}>
        <div className={styles.sectionTitle}>
          <img
            src={coursesIcon}
            alt="Courses icon"
            className={styles.iconCourse}
          />
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
    {loading ? (
      <p className={styles.loadingMessage}>Loading grades...</p>
    ) : error ? (
      <p className={styles.errorMessage}>{error}</p>
    ) : gradesData.length === 0 ? (
      <p className={styles.emptyMessage}>No data available</p>
    ) : (
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={gradesData}
            margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
          >
            <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" />
            <XAxis
              dataKey="name"
              angle={-30}
              textAnchor="end"
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 10]} 
              tickCount={6} 
              tick={{ fontSize: 12 }} 
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="grade"
              stroke="#f06292"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}
  </div>
</section>

      <BottomNav />
    </div>
  );
};

export default Dashboard;