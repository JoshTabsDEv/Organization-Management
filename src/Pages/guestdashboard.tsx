import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  status: string;
}

export default function GuestDashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const fullname = typeof window !== "undefined" ? localStorage.getItem("fullname") : null;
  const role = typeof window !== "undefined" ? localStorage.getItem("role") : null;

  const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Fetch departments (read-only for guests)
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (error) {
      console.error("Error loading departments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-content">
            <div>
              <h1 className="dashboard-title">Welcome, {fullname || "Guest"}!</h1>
              <p className="dashboard-subtitle">
                <span className="role-badge">{role || "Guest"}</span>
                {role === "admin" ? " - Full Access" : " - View Only Access"}
              </p>
            </div>
            <button className="logout-btn" onClick={logout} title="Logout">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              Logout
            </button>
          </div>
        </header>

        {/* Info Card */}
        <div className="dashboard-card">
          <div className="info-section">
            <div className="info-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="info-content">
              <h2>User Profile</h2>
              <p>
                {role === "admin" 
                  ? "You have full administrative access to manage projects and users."
                  : "You have view-only access. You can browse projects but cannot make changes."}
              </p>
            </div>
          </div>
        </div>

        {/* Departments Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Projects</h2>
            <span className="department-count">
              {departments.length} {departments.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {loading ? (
            <div className="loading-state">
              <span className="spinner"></span>
              <p>Loading projects...</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <p>No projects found</p>
              <span>There are currently no projects available</span>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="departments-table">
                <thead>
                  <tr>
                    <th>Project Code</th>
                    <th>Project Name</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>
                        <span className="abbreviation-badge">{dept.abbreviation}</span>
                      </td>
                      <td className="name-cell">{dept.name}</td>
                      <td className="description-cell">{dept.description}</td>
                      <td>
                        <span className={`status-badge status-${dept.status.toLowerCase()}`}>
                          {dept.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Info Card */}
        <div className="dashboard-card">
          <div className="quick-info-grid">
            <div className="quick-info-item">
              <div className="quick-info-icon" style={{ background: "rgba(79, 70, 229, 0.1)", color: "#4f46e5" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <h3>Total Projects</h3>
                <p className="quick-info-value">{departments.length}</p>
              </div>
            </div>

            <div className="quick-info-item">
              <div className="quick-info-icon" style={{ background: "rgba(34, 197, 94, 0.1)", color: "#22c55e" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div>
                <h3>Active</h3>
                <p className="quick-info-value">
                  {departments.filter(d => d.status.toLowerCase() === "active").length}
                </p>
              </div>
            </div>

            <div className="quick-info-item">
              <div className="quick-info-icon" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#ef4444" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <div>
                <h3>Inactive</h3>
                <p className="quick-info-value">
                  {departments.filter(d => d.status.toLowerCase() === "inactive").length}
                </p>
              </div>
            </div>

            <div className="quick-info-item">
              <div className="quick-info-icon" style={{ background: "rgba(251, 191, 36, 0.1)", color: "#fbbf24" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3>Pending</h3>
                <p className="quick-info-value">
                  {departments.filter(d => d.status.toLowerCase() === "pending").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
