import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
function requireAuth(WrappedComponent, isTutorDashboard = false) {
    return function AuthComponents(props) {  
        const userDB = useContext(UserContext)
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkAuth = async () => {
                try {
                    const user = JSON.parse(localStorage.getItem("userTutorly")) || JSON.parse(sessionStorage.getItem("userTutorly"));
                    if (!user) {
                        navigate("/login");
                        return;
                    }
                    
                    if (isTutorDashboard && !userDB.isTutor) {
                        navigate("/tutor-application");
                        return;
                    }

                    // Additional authentication checks if needed
                    
                    setLoading(false);
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    navigate("/login");
                }
            };

            checkAuth();
        }, [navigate, isTutorDashboard]);

        if (loading) {
            return <p className="text-center mt-8 text-gray-700">Loading...</p>;
        } else {
            return <WrappedComponent {...props}/>;
        }
    };
}

export default requireAuth;
