import '../i18n';
import {RootStackParamList} from './types';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WalletAnalysisScreen from '../screens/WalletAnalysisScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {DEFAULT_COLOR} from '../constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {t} = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: t('app:title'),
          }}
        />
        <Stack.Screen
          name="WalletAnalysis"
          component={WalletAnalysisScreen}
          options={{
            headerBackButtonDisplayMode: 'minimal',
            title: t('walletAnalysis:title'),
            headerTintColor: DEFAULT_COLOR,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
