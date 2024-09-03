import { getCourses, getDepartments, getFaculties, getYears } from 'api/app';
import * as actionType from '../constants/app.constants';

export const userLogOut = () => (dispatch) => {
  localStorage.removeItem('session');
  localStorage.removeItem('sessions');

  dispatch({ type: actionType.USER_LOGOUT });
};

export const getApplicationData = () => async (dispatch) => {
  const [faculties, department, courses, years] = await Promise.all([getFaculties(), getDepartments(), getCourses(), getYears()]);
  if (faculties.ok) {
    dispatch({ type: actionType.SET_FACULTIES, payload: faculties.data });
  }

  if (department.ok) {
    dispatch({ type: actionType.SET_DEPARTMENT, payload: department.data });
  }

  if (courses.ok) {
    dispatch({ type: actionType.SET_COURSES, payload: courses.data });
  }
  if (years.ok) {
    dispatch({ type: actionType.SET_YEARS, payload: years.data });
  }
};
