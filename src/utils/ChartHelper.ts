import {HistoryDataModel} from '../models/ChartData';

class ChartHelper {
  convertToChartData = (historyModel: HistoryDataModel) => {
    const xArray = historyModel.t;
    const yArray = historyModel.c;

    const length = Math.min(xArray.length, yArray.length);

    const result = [];
    for (let i = 0; i < length; i++) {
      result.push({x: xArray[i], y: yArray[i]});
    }

    return result;
  };

  formatNumber = (value: number) => {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(3).replace(/\.0$/, '') + 'B';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    } else {
      return value.toString();
    }
  };

  formatDateIntl = (timestamp: number, locale = 'tr-TR') => {
    return new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
    }).format(new Date(timestamp));
  };
}

export default new ChartHelper();
