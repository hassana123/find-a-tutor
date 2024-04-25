import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

function requireAuth(WrappedComponent, isTutorDashboard = false) {
    return function AuthComponents(props) {  
        const data = useContext(UserContext);
        const navigate = useNavigate();
       // const [loading, setLoading] = useState(true);
        const [userDataFetched, setUserDataFetched] = useState(false); // Track whether user data has been fetched
        const userId = JSON.parse(localStorage.getItem("userTutorlyId")) || JSON.parse(sessionStorage.getItem("userTutorlyId"));
            //console.log(userId);
            //console.log(data.loading);
           // console.log(!data.user.isTutor);
        useEffect(() => {
            const checkAuth =  () => {
                try {
                    if (!userId) {
                        navigate("/login");
                    }
                    if (data.user && isTutorDashboard && data.user?.isTutor === false) {
                        setUserDataFetched(true)
                        navigate("/user-Dashboard");
                        return;
                    }
                   
                } catch (error) {
                    console.error("Error checking authentication:", error);
                    navigate("/");
                    
                }
            };

            checkAuth();
        }, [navigate, isTutorDashboard, data.user]); 


        if (data.loading) {
            return <p className="text-center mt-8 text-red-700">Loading...</p>;
        } else {
            return <WrappedComponent {...props}/>;
        }
    };
}

export default requireAuth;
