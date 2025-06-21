import {Period} from '../enums';
import {HistoryDataModel} from '../models/ChartData';
import HttpClient from '../utils/HttpClient';

const HistoryService = {
  getHistoryChart: (period: Period) =>
    HttpClient.get<HistoryDataModel>(
      `/chart/history?symbol=btc_tl&period=${period}&type=basic`,
    ),
};

export default {
  HistoryService,
};
