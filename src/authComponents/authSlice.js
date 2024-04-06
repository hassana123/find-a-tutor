// authSlice.js
import { createSlice } from '@reduxjs/toolkit';
 
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success:null,
    isTutor:false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
        state.success = action.payload;
      },
      setIsTutor: (state, action) => {
        state.isTutor = action.payload;
      },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = null;
    },
  },
});

export const Login = (email, password, rememberMe) => async (dispatch) => {
    
  };
  
  export const signup = (email, password, fullName) => async (dispatch) => {
    // const navigate = useNavigate();
   
  };
// export const isAuthenticatedUser =()=>{
//     //const isAuthenticatedRedux = useSelector((state) => state.auth.user !== null);
//     const isAuthenticatedLocalStorage = localStorage.getItem('tutorlyUser') === 'true';
//     const isAuthenticated =  isAuthenticatedLocalStorage;
//     return !!isAuthenticated;
// }
export const { setUser, setLoading, setSuccess, setIsTutor, setError, clearError , clearSuccess} = authSlice.actions;

export default authSlice.reducer;
