import { useEffect, useState } from "react";
import axios from "axios";

interface Department {
  id: number;
  abbreviation: string;
  name: string;
  description: string;
  status: string;
}

export default function Dashboard() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [form, setForm] = useState({ abbreviation: "", name: "", description: "", system: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const fullname = typeof window !== "undefined" ? localStorage.getItem("fullname") : null;

  const api = axios.create({
    baseURL: "/api",
    headers: { "Content-Type": "application/json" },
  });

  // Fetch departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await api.get("/departments");
      setDepartments(res.data.data || []);
    } catch (error) {
      showMessage("Error loading organizations.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // Form change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async () => {
    if (!form.abbreviation || !form.name || !form.description || !form.system) {
      showMessage("Please fill in all fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      // Map system field to status for backend compatibility
      const payload = {
        abbreviation: form.abbreviation,
        name: form.name,
        description: form.description,
        status: form.system,
      };
      
      if (editingId !== null && editingId > 0) {
        await api.put(`/departments/${editingId}`, payload);
        showMessage("Organization updated successfully!", "success");
      } else {
        await api.post("/departments", payload);
        showMessage("Organization added successfully!", "success");
      }

      setForm({ abbreviation: "", name: "", description: "", system: "" });
      setEditingId(null);
      fetchDepartments();
    } catch (error: any) {
      showMessage(error.response?.data?.message || "Error submitting organization.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (department: Department) => {
    setForm({
      abbreviation: department.abbreviation,
      name: department.name,
      description: department.description,
      system: department.status,
    });
    setEditingId(department.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setForm({ abbreviation: "", name: "", description: "", system: "" });
    setEditingId(null);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this organization? This action cannot be undone.")) {
      try {
        await api.delete(`/departments/${id}`);
        showMessage("Organization deleted successfully!", "success");
        fetchDepartments();
      } catch (error: any) {
        showMessage(error.response?.data?.message || "Error deleting organization.", "error");
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("fullname");
      localStorage.removeItem("role");
      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 className="sidebar-title">OrgHub</h2>
        </div>
        
        <div className="sidebar-user">
          <div className="user-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="user-info">
            <p className="user-name">{fullname || "User"}</p>
            <p className="user-role">Administrator</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="9" y1="9" x2="21" y2="9"></line>
            </svg>
            <span>Organizations</span>
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="dashboard-topbar">
          <div className="topbar-content">
            <h1 className="page-title">{editingId ? "Edit Organization" : "Manage Organizations"}</h1>
            <div className="topbar-stats">
              <div className="stat-item">
                <span className="stat-label">Total</span>
                <span className="stat-value">{departments.length}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Message Alert */}
        {message && (
          <div className={`dashboard-alert ${message.type}`}>
            <div className="alert-icon">
              {message.type === "success" ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              )}
            </div>
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="alert-close">×</button>
          </div>
        )}

        <div className="dashboard-content">
          {/* Form Section */}
          <section className="content-section">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">{editingId ? "Edit Organization" : "Create New Organization"}</h2>
                {editingId && (
                  <button className="cancel-btn" onClick={handleCancel}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Cancel
                  </button>
                )}
              </div>

              <div className="form-container">
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="abbreviation">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      Organization Code *
                    </label>
                    <input
                      id="abbreviation"
                      name="abbreviation"
                      type="text"
                      value={form.abbreviation}
                      onChange={handleChange}
                      placeholder="e.g., ORG-001, DEPT-2024"
                      maxLength={10}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="12" y1="18" x2="12" y2="12"></line>
                        <line x1="9" y1="15" x2="15" y2="15"></line>
                      </svg>
                      Organization Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter organization name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="description">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      Organization Description *
                    </label>
                    <input
                      id="description"
                      name="description"
                      type="text"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the organization details"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="system">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      System Type *
                    </label>
                    <select
                      id="system"
                      name="system"
                      value={form.system}
                      onChange={handleChange}
                    >
                      <option value="">Select System</option>
                      <option value="Enterprise System">Enterprise System</option>
                      <option value="Department System">Department System</option>
                      <option value="Branch System">Branch System</option>
                      <option value="Regional System">Regional System</option>
                      <option value="Central System">Central System</option>
                    </select>
                  </div>
                </div>

                <button 
                  className="submit-btn" 
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      {editingId ? "Updating..." : "Creating..."}
                    </span>
                  ) : (
                    <>
                      {editingId ? (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                          </svg>
                          Update Organization
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          Create Organization
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>

          {/* Table Section */}
          <section className="content-section">
            <div className="section-card">
              <div className="section-header">
                <h2 className="section-title">All Organizations</h2>
                <span className="section-badge">{departments.length} {departments.length === 1 ? "organization" : "organizations"}</span>
              </div>

              {loading ? (
                <div className="loading-state">
                  <span className="spinner"></span>
                  <p>Loading organizations...</p>
                </div>
              ) : departments.length === 0 ? (
                <div className="empty-state">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <p>No organizations found</p>
                  <span>Create your first organization to get started</span>
                </div>
              ) : (
                <div className="table-wrapper">
                  <table className="departments-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Organization Name</th>
                        <th>Description</th>
                        <th>System</th>
                        <th>Actions</th>
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
                            <span className={`status-badge status-${dept.status.toLowerCase().replace(/\s+/g, '-')}`}>
                              {dept.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="action-btn edit-btn" 
                                onClick={() => handleEdit(dept)}
                                title="Edit organization"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                                Edit
                              </button>
                              <button 
                                className="action-btn delete-btn" 
                                onClick={() => handleDelete(dept.id)}
                                title="Delete organization"
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
