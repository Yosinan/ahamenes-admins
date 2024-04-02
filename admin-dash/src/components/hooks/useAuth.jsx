

import { useState, useEffect } from "react";

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    
    useEffect(() => {
        const passwordEntered = localStorage.getItem("passwordEntered");
        if (passwordEntered) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    }, []);

    return authenticated;
};

export default useAuth;
