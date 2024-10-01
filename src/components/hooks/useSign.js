import { useState } from "react";

    export const useSign = (initialValue = false) => {
        const [isopen, setIsopen] = useState(false);
        const openSignUp = () => setIsopen(true)
        const closeSignUp = () => setIsopen(false)


        return [isopen,openSignUp, closeSignUp];
          };