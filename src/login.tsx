import { useState } from "react";
import "./App.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">("error");
  const navigate = useNavigate();

  // === Manual login ===
  const handleLogin = async () => {
    if (!username || !password) {
      setMessage("Please fill in all fields");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");
    
    try {
      const { data } = await axios.post("/api/login", {
        username,
        password,
      });

      if (data.success) {
        localStorage.setItem("fullname", data.fullname);
        localStorage.setItem("role", data.role);
        setMessage("Login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (data.role === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials");
        setMessageType("error");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Server error. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // === Google login ===
  const handleGoogleLogin = async (credentialResponse: any) => {
    setIsLoading(true);
    setMessage("");
    
    try {
      if (!credentialResponse.credential) {
        setMessage("No Google credentials found");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      const res = await axios.post("/api/google-login", {
        token: credentialResponse.credential,
      });

      if (res.data.success) {
        localStorage.setItem("fullname", res.data.fullname);
        localStorage.setItem("role", res.data.role.toLowerCase());

        setMessage("Google login successful! Redirecting...");
        setMessageType("success");

        setTimeout(() => {
          if (res.data.role.toLowerCase() === "admin") {
            window.location.href = "/dashboard";
          } else {
            window.location.href = "/guestdashboard";
          }
        }, 1000);
      } else {
        setMessage(res.data.message || "Google login failed");
        setMessageType("error");
      }
    } catch (err: any) {
      console.error("Google login error:", err);
      setMessage(err.response?.data?.message || "Google login failed");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <GoogleOAuthProvider clientId="1016616466017-03fsmris44cv89qnelaed641obt80dmh.apps.googleusercontent.com">
      <div className="login-wrapper">
        {/* Animated Background Elements */}
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <div className="login-content">
          {/* Left Side - Branding & Features */}
          <div className="login-branding">
            <div className="brand-content">
              <div className="brand-logo">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h1 className="brand-title">Organization Management</h1>
              <p className="brand-subtitle">Streamline your organization management with ease</p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3>Secure Access</h3>
                    <p>Enterprise-grade security for your data</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="9" y1="9" x2="21" y2="9"></line>
                    </svg>
                  </div>
                  <div>
                    <h3>Easy Management</h3>
                    <p>Intuitive interface for managing organizations</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div>
                    <h3>Role-Based Access</h3>
                    <p>Customized experience based on your role</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="login-form-container">
            <div className="login-card">
              <div className="login-header">
                <h2>Welcome Back</h2>
                <p className="login-subtitle">Sign in to continue to your account</p>
              </div>

              <div className="login-form">
                <div className="input-group">
                  <label htmlFor="username">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className={message && messageType === "error" && !username ? "input-error" : ""}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="password">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                    className={message && messageType === "error" && !password ? "input-error" : ""}
                  />
                </div>

                {message && (
                  <div className={`message-alert ${messageType}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {messageType === "success" ? (
                        <polyline points="20 6 9 17 4 12"></polyline>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </>
                      )}
                    </svg>
                    <span>{message}</span>
                  </div>
                )}

                <button 
                  className="login-btn-primary" 
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      Signing in...
                    </span>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </>
                  )}
                </button>

                <button 
                  className="register-btn-secondary" 
                  onClick={() => navigate("/register")}
                  disabled={isLoading}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                  Create New Account
                </button>

                <div className="divider">
                  <span>OR</span>
                </div>

                <div className="google-login-wrapper">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setMessage("Google login failed");
                      setMessageType("error");
                    }}
                    useOneTap
                  />
                </div>

                <div className="login-footer">
                  <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
