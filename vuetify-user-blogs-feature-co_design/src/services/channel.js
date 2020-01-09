import {
  ServiceMaker,
  methods
} from "./index";

export const getChannelListEndpoint = () => ServiceMaker("/channel/get?", methods.GET);

export const getOptimizeAlgoritm = (data, headers) => ServiceMaker("/optimization/channel", methods.POST, data, headers);

export const getGenreChannelsList = () => ServiceMaker("/genre/get", methods.GET);

export const getBroadCasterList = () => ServiceMaker("/broadcaster/get?", methods.GET);

export const getLanguagelsList = () => ServiceMaker("/language/get?", methods.GET);