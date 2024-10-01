import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitRegister = async () => {
    setError("");
    setLoading(true);

    // Verificar que email y password no estén vacíos
    if (!email || !password) {
      setError("El email y la contraseña son obligatorios.");
      setLoading(false);
      return;
    }

    // Datos del usuario a enviar
    const userData = { email, password };
    console.log("Datos enviados:", userData);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      // Si la respuesta no es exitosa, lanzar un error
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en el registro");
      }

      // Procesar la respuesta de la API
      const data = await response.json();
      console.log("Registro exitoso:", data);

      setEmail("");
      setPassword("");

      // Opcional: Redirigir a otra página tras el registro exitoso, por ejemplo, al perfil o login
      navigate("/login");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      setError(error.message); // Mostrar mensaje de error en la UI
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    alert(data?.error || "Authentication successful!");
    localStorage.setItem("token", data.token);
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
        handleSubmitLogin,
        error,
        loading,
        handleSubmitRegister,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
