import { createSlice } from '@reduxjs/toolkit';

export const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    name: '',
    email: '',
    level: '',
    department: '',
    image: '',
    schoolId: '',
    bio: '',
    experience: '',
    availability: '',
    courses: [], 
    additionalInfo: '', 
    isSubmitting: false,
    submitError: null,
    submitSucessState: false,
  },
  reducers: {
    setField: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    startSubmitting: (state) => {
      state.isSubmitting = true;
      state.submitError = null;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
      state.submitSucessState = true;
      // Reset form fields
      state.name = '';
      state.email = '';
      state.level = '';
      state.department = '';
      state.image = '';
      state.schoolId = '';
      state.bio = '';
      state.experience = '';
      state.availability = '';
      state.courses = [];
      state.additionalInfo = '';
    },
    submitError: (state, action) => {
      state.isSubmitting = false;
      state.submitError = action.payload;
    },
  },
});

export const { setField, startSubmitting, submitSuccess, submitError } = applicationSlice.actions;

export default applicationSlice.reducer;
