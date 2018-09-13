import axios from 'axios';
import {
  GET_CLASSROOM,
  GET_CLASSROOMS,
  CLASSROOM_LOADING,
  CLEAR_CURRENT_CLASSROOM,
  GET_ERRORS,
  SET_CURRENT_CLASSROOM
} from './types';

// Get all classrooms
export const getClassRooms = () => dispatch => {
  dispatch(setClassRoomLoading());
  axios
    .get('/api/classrooms/')
    .then(res =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CLASSROOMS,
        payload: null
      })
    );
};

// // Get current profile
// export const getCurrentClassRooms = () => dispatch => {
//   dispatch(setClassRoomLoading());
//   axios
//     .get('/api/classroom')
//     .then(res =>
//       dispatch({
//         type: GET_CLASSROOM,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_CLASSROOM,
//         payload: {}
//       })
//     );
// };

// // Get profile by handle
// export const getProfileByHandle = handle => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get(`/api/profile/handle/${handle}`)
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: null
//       })
//     );
// };
//
// // add experience
// export const addExperience = (expData, history) => dispatch => {
//   axios
//     .post('/api/profile/experience', expData)
//     .then(res => history.push('/dashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
//
// // add education
// export const addEducation = (eduData, history) => dispatch => {
//   axios
//     .post('/api/profile/education', eduData)
//     .then(res => history.push('/dashboard'))
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
//
// // delete experience
// export const deleteExperience = id => dispatch => {
//   axios
//     .delete(`/api/profile/experience/${id}`, id)
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
//
// // delete education
// export const deleteEducation = id => dispatch => {
//   axios
//     .delete(`/api/profile/education/${id}`, id)
//     .then(res =>
//       dispatch({
//         type: GET_PROFILE,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };
//
// // Get all profiles
// export const getProfiles = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get('/api/profile/all')
//     .then(res =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data
//       })
//     )
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: null
//       })
//     );
// };
//
// // Delete account and profile
// export const deleteAccount = () => dispatch => {
//   if (window.confirm('Are you sure? This can NOT be undone!')) {
//     axios
//       .delete('/api/profile')
//       .then(res =>
//         dispatch({
//           type: SET_CURRENT_USER,
//           payload: {}
//         })
//       )
//       .catch(err =>
//         dispatch({
//           type: GET_ERRORS,
//           payload: err.response.data
//         })
//       );
//   }
// };

// Create Class
export const createClassRoom = (classRoomData, history) => dispatch => {
  axios
    .post('/api/classrooms/create-classroom', classRoomData)
    .then(res => history.push('/classrooms'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Profile loading
export const setClassRoomLoading = () => {
  return {
    type: CLASSROOM_LOADING
  };
};

// clear profile
export const clearCurrentClassRoom = () => {
  return {
    type: CLEAR_CURRENT_CLASSROOM
  };
};
