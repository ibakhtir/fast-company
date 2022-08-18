import httpService from "./http.service";

const professionEndpoint = "profession/";

const professionService = {
  getProfessions: async () => {
    const { data } = await httpService.get(professionEndpoint);
    return data;
  }
};

export default professionService;
