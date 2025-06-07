import { logout } from '@/redux/slices/userSlice';
import { clearStorage } from './asyncStorage';

const logoutUser = async (dispatch: any) => {
  dispatch(logout());
  clearStorage();
};
export { logoutUser };
