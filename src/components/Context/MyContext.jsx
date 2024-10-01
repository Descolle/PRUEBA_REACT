import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  const handleSubmitRegister = async () => {
    setError("");
    setLoading(true);

    if (!user || !password) {
      setError("El email y la contraseña son obligatorios.");
      setLoading(false);
      return;
    }
    const userData = { email: user, password };
    console.log("Datos enviados:", userData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      const data = await response.json();
      console.log("Registro exitoso:", data);

      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser("");
      setPassword("");

      navigate("PRUEBA_REACT/login");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user, password }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      alert("Authentication successful!");
      setToken(data.token);
      navigate("PRUEBA_REACT/profile");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        password,
        setPassword,
        error,
        loading,
        handleSubmitLogin,
        handleSubmitRegister,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
