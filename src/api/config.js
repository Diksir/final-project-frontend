import { create } from 'apisauce';
import { store } from 'store';
import { userLogOut } from 'store/actions/app.actions';

export const BASE_URL = 'http://3.249.27.46/api';

const monitorBadToken = (response) => {
  if (response.status === 401) {
    store.dispatch(userLogOut());
    toast.info('Your session has expired please login again');
  }
};

export const http = create({
  baseURL: BASE_URL
});

http.addMonitor(monitorBadToken);
