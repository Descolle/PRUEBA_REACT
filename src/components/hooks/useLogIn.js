import { useState } from "react";
export const useLogIn = () => {
  const [abierto, setAbierto] = useState(false);

  const openLog = () => setAbierto(true);
  const closeLog = () => setAbierto(false);

  return [abierto, openLog, closeLog];
};
