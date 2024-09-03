/* eslint-disable no-unneeded-ternary */
/* eslint-disable default-param-last */
import * as auth from '../constants/app.constants';

const userSession = localStorage.getItem('session') ? JSON.parse(localStorage.getItem('session')) : {};

const initialState = {
  token: userSession.token || null,
  isAuthenticated: userSession.token ? true : false,
  isLoading: false,
  faculties: [],
  courses: [],
  years: [],
  departments: [],
  user: userSession.user || null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case auth.USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case auth.SET_COURSES:
      return {
        ...state,
        courses: action.payload
      };
    case auth.SET_FACULTIES:
      return {
        ...state,
        faculties: action.payload
      };
    case auth.SET_DEPARTMENT:
      return {
        ...state,
        departments: action.payload
      };
      case auth.SET_YEARS:
      return {
        ...state,
        years: action.payload
      };
    case auth.LOGIN_SUCCEED:
      localStorage.setItem('user_session', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true
      };
    case auth.USER_UPDATE:
      return {
        ...state,
        user: action.payload
      };
    case auth.USER_LOGOUT:
      return {};
    case auth.AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false
      };
    default:
      return state;
  }
}
