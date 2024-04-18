import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function requireAuth(WrappedComponent, isTutorDashboard = false) {
    return function AuthComponents(props) {  
        const user = useContext(UserContext);
        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const [userDataFetched, setUserDataFetched] = useState(false); // Track whether user data has been fetched
        const userDeet = JSON.parse(localStorage.getItem("userTutorly")) || JSON.parse(sessionStorage.getItem("userTutorly"));
            
        useEffect(() => {
                  
            const checkAuth = async () => {
                try {
                   
                    if (!userDeet) {
                        navigate("/login");
                        return;
                    }
                    
                    // Additional authentication checks if needed
                    
                    if(user){
                        setUserDataFetched(true);
                        setLoading(false);
                        return;
                    }
                   
                    
                    if (isTutorDashboard && !user?.isTutor) {
                        navigate("/user-Dashboard");
                        return;
                    }
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    navigate("/login");
                }
            };

            checkAuth();
        }, [navigate, isTutorDashboard, user, userDeet]); // Add userDB to dependencies

        // Check loading and userDataFetched states before rendering
        if (loading || !userDataFetched) {
            return <p className="text-center mt-8 text-gray-700">Loading...</p>;
        } else {
            return <WrappedComponent {...props}/>;
        }
    };
}

export default requireAuth;
