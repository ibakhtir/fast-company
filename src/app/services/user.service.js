import httpService from "./http.service";
import { getUserId } from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await httpService.get(userEndpoint + getUserId());
    return data;
  },

  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },

  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + getUserId(),
      payload
    );
    return data;
  },

  remove: async (userId) => {
    const { data } = await httpService.delete(userEndpoint + userId);
    return data;
  }
};

export default userService;
