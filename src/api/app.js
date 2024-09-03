import { http } from './config';
import { store } from 'store';

export const getFaculties = async () => {
  const token = store.getState().app.token;

  return http.get(
    '/faculties',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};

export const getCourses = async () => {
  const token = store.getState().app.token;

  return http.get(
    '/courses',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};

export const getDepartments = async () => {
  const token = store.getState().app.token;

  return http.get(
    '/departments',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};

export const getYears = async () => {
  const token = store.getState().app.token;

  return http.get(
    '/years',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};

export const sendMessage = async (payload) => {
  const token = store.getState().app.token;

  return http.post('/messages/', payload, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export const getMessages = async () => {
  const token = store.getState().app.token;

  return http.post(
    '/messages/',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};

export const startSessions = async (payload) => {
  const token = store.getState().app.token;

  return http.post('/qsession/', payload, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
};

export const getSessions = async () => {
  const token = store.getState().app.token;

  return http.get(
    '/qsession/',
    {},
    {
      headers: {
        Authorization: `Token ${token}`
      }
    }
  );
};
