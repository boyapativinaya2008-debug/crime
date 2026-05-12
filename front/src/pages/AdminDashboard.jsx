import React from "react";

const DashboardHome = () => {
  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>CrimeSnap</h2>

        <ul style={styles.menu}>
          <li style={styles.menuItem}>🏠 Dashboard</li>
          <li style={styles.menuItem}>👥 Users</li>
          <li style={styles.menuItem}>📋 Complaints</li>
          <li style={styles.menuItem}>📊 Analytics</li>
          <li style={styles.menuItem}>⚙ Settings</li>
        </ul>

        <button style={styles.logoutBtn}>Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div style={styles.main}>
        {/* NAVBAR */}
        <div style={styles.navbar}>
          <h1>Dashboard Analytics</h1>

          <div style={styles.navRight}>
            <input
              type="text"
              placeholder="Search..."
              style={styles.search}
            />

            <div style={styles.profile}>
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                style={styles.profileImg}
              />

              <span>Admin</span>
            </div>
          </div>
        </div>

        {/* ANALYTICS CARDS */}
        <div style={styles.cardsContainer}>
          <div style={styles.card}>
            <h3>Total Users</h3>
            <p>150</p>
          </div>

          <div style={styles.card}>
            <h3>Total Complaints</h3>
            <p>98</p>
          </div>

          <div style={styles.card}>
            <h3>Resolved</h3>
            <p>63</p>
          </div>

          <div style={styles.card}>
            <h3>Pending</h3>
            <p>35</p>
          </div>
        </div>

        {/* CHARTS */}
        <div style={styles.chartSection}>
          {/* BAR CHART */}
          <div style={styles.chartBox}>
            <h2>Monthly Complaints</h2>

            <div style={styles.barContainer}>
              <div style={{ ...styles.bar, height: "80px" }}></div>
              <div style={{ ...styles.bar, height: "140px" }}></div>
              <div style={{ ...styles.bar, height: "100px" }}></div>
              <div style={{ ...styles.bar, height: "170px" }}></div>
              <div style={{ ...styles.bar, height: "120px" }}></div>
              <div style={{ ...styles.bar, height: "200px" }}></div>
            </div>
          </div>

          {/* STATUS BOX */}
          <div style={styles.chartBox}>
            <h2>Complaint Status</h2>

            <div style={styles.analytics}>
              <div style={styles.circle}>
                <h1>64%</h1>
                <p>Resolved</p>
              </div>

              <div style={styles.statusInfo}>
                <p>✅ Resolved: 63</p>
                <p>🟡 Pending: 35</p>
                <p>👥 Users: 150</p>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div style={styles.activityBox}>
          <h2>Recent Activity</h2>

          <ul style={styles.activityList}>
            <li>✔ Complaint resolved</li>
            <li>📋 New complaint added</li>
            <li>👤 New user registered</li>
            <li>🚧 Pending complaint updated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Arial",
    backgroundColor: "#eef2ff",
  },

  /* SIDEBAR */
  sidebar: {
    width: "240px",
    backgroundColor: "#111827",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  logo: {
    textAlign: "center",
    marginBottom: "30px",
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  menuItem: {
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#1f2937",
    borderRadius: "10px",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "white",
    cursor: "pointer",
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: "25px",
  },

  /* NAVBAR */
  navbar: {
    backgroundColor: "white",
    padding: "15px 25px",
    borderRadius: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  search: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "220px",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  profileImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },

  /* CARDS */
  cardsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  /* CHARTS */
  chartSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "30px",
  },

  chartBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  barContainer: {
    display: "flex",
    alignItems: "flex-end",
    gap: "15px",
    height: "250px",
    marginTop: "20px",
  },

  bar: {
    width: "50px",
    backgroundColor: "#2563eb",
    borderRadius: "8px 8px 0 0",
  },

  analytics: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: "30px",
  },

  circle: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "12px solid #22c55e",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  statusInfo: {
    lineHeight: "40px",
    fontSize: "18px",
  },

  /* ACTIVITY */
  activityBox: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  activityList: {
    marginTop: "15px",
    lineHeight: "40px",
  },
};

export default DashboardHome;