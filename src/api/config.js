import { create } from 'apisauce';
import { store } from 'store';
import { userLogOut } from 'store/actions/app.actions';

const monitorBadToken = (response) => {
  if (response.status === 401) {
    store.dispatch(userLogOut());
    toast.info('Your session has expired please login again');
  }
};

export const http = create({
  baseURL: 'http://3.249.27.46/api'
});

http.addMonitor(monitorBadToken);
