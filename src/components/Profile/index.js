import React from "react";
import styles from "./profile.module.css";
import profileImg from "../../assets/profile.jpg"; // ajuste o caminho
import editProfile from "../../assets/editProfile.svg";
const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerBackground}></div>
      
      <div className={styles.profileWrapper}>
        <div className={styles.imageContainer}>
          <img src={profileImg} alt="User" className={styles.profileImage} />
          <div className={styles.editIcon}>
             <img src={editProfile} alt="New Course" className={styles.iconEdit} />
          </div>
        </div>
        <div className={styles.userInfo}>
          <h3>User name</h3>
          <p>Email@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
