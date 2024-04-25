import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function requireAuth(WrappedComponent, isTutorDashboard = false) {
    return function AuthComponents(props) {  
        const user = useContext(UserContext);
//        const loading = useSelector((state) => state.auth.loading);

        const navigate = useNavigate();
        const [loading, setLoading] = useState(true);
        const [userDataFetched, setUserDataFetched] = useState(false); // Track whether user data has been fetched
        const userId = JSON.parse(localStorage.getItem("userTutorlyId")) || JSON.parse(sessionStorage.getItem("userTutorlyId"));
            
        useEffect(() => {
                  
            const checkAuth = async () => {
                try {
                   
                    if (!userId) {
                        navigate("/login");
                        setLoading(false);
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
                        setUserDataFetched(true)
                        setLoading(false);
                        return;
                    }
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    navigate("/login");
                    setLoading(false)
                }
            };

            checkAuth();
        }, [navigate, isTutorDashboard, user, userId]); 


        if (loading && !userDataFetched) {
            return <p className="text-center mt-8 text-red-700">Loading...</p>;
        } else {
            return <WrappedComponent {...props}/>;
        }
    };
}

export default requireAuth;
