import axios from 'axios';
import { User } from 'types';

const uri = `${process.env.HTTPS || 'http://localhost:4000'}/api/users`;

const getUserData = async (name: string) => {
  try {
    const res = await axios.get<User>(`${uri}/${name}`);
    return res.data;
  } catch (e) {
    return null;
  }
};

export { getUserData };
