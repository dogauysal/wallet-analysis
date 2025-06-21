import {ActivityIndicator, View} from 'react-native';
import {walletAnalysisStyles as styles} from '../styles/WalletAnalysis.styles';
import {ActionButton} from '../components/ActionButton/ActionButton';
import {BRAND_COLOR, UNSELECTED_COLOR} from '../constants';
import {useTranslation} from 'react-i18next';
import {useCallback, useContext, useEffect, useState} from 'react';
import {Period} from '../enums';
import agent from '../services/agent';
import {AppContext} from '../context/AppContext';
import {Chart} from '../components/Chart/Chart';
import ChartHelper from '../utils/ChartHelper';

const WalletAnalysisScreen: React.FC = () => {
  const {t} = useTranslation();

  const {selectedPeriod, updatePeriod} = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>([]);

  const onChangeFilter = useCallback((period: Period) => {
    updatePeriod(period);
  }, []);

  useEffect(() => {
    fetchChartData();
  }, [selectedPeriod]);

  const fetchChartData = async () => {
    setLoading(true);

    await agent.HistoryService.getHistoryChart(selectedPeriod)
      .then(res => {
        const chartData = ChartHelper.convertToChartData(res);

        setChartData(chartData);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <ActionButton
          width={100}
          height={32}
          radius={32}
          color={
            selectedPeriod === Period.WEEKLY ? BRAND_COLOR : UNSELECTED_COLOR
          }
          title={t('walletAnalysis:weekly')}
          onTap={() => onChangeFilter(Period.WEEKLY)}
          disabled={false}
        />
        <ActionButton
          width={100}
          height={32}
          radius={32}
          color={
            selectedPeriod === Period.MONTHLY ? BRAND_COLOR : UNSELECTED_COLOR
          }
          title={t('walletAnalysis:monthly')}
          onTap={() => onChangeFilter(Period.MONTHLY)}
          disabled={false}
        />
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
        <View style={styles.chartContainer}>
          <Chart data={chartData} />
        </View>
      )}
    </View>
  );
};

export default WalletAnalysisScreen;
