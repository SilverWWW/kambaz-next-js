import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const USERS_API = `${HTTP_SERVER}/api/users`;

const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(USERS_API);
  return data;
};

export const findUserById = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return data;
};

export const findUsersEnrolledInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(USERS_API, user);
  return data;
};

export const updateUser = async (user: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return data;
};

export const deleteUser = async (userId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

