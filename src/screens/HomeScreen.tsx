import {Text} from 'react-native';
import {View} from 'react-native';
import {ActionButton} from '../components/ActionButton/ActionButton';
import {BRAND_COLOR, DEFAULT_COLOR} from '../constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {homeScreenStyles as styles} from '../styles/HomeScreen.styles';
import {ActionLink} from '../components/ActionLink/ActionLink';
import {useTranslation} from 'react-i18next';
import {useCallback, useContext, useEffect} from 'react';
import {AppContext} from '../context/AppContext';
import {Language} from '../enums';

type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC<HomeScreenNavigationProp> = ({navigation}) => {
  const {t, i18n} = useTranslation();

  const {language, updateLangu} = useContext(AppContext);

  const changeLanguage = useCallback((lng: Language) => {
    updateLangu(lng);
  }, []);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{t('home:title')}</Text>
        <Text style={styles.amount}>₺ 100.000</Text>
      </View>

      <ActionButton
        width={150}
        height={28}
        radius={10}
        color={BRAND_COLOR}
        title={t('home:walletAnalysisButton')}
        titleStyles={{
          fontSize: 20,
          fontWeight: '500',
        }}
        disabled={false}
        onTap={() => navigation.navigate('WalletAnalysis')}
      />

      <View style={styles.actionLinkContainer}>
        <ActionLink
          title="EN"
          fontSize={16}
          color={DEFAULT_COLOR}
          isSelected={language === Language.ENGLISH}
          onTap={() => changeLanguage(Language.ENGLISH)}
        />
        <Text> | </Text>
        <ActionLink
          title="TR"
          fontSize={16}
          color={DEFAULT_COLOR}
          isSelected={language === Language.TURKISH}
          onTap={() => changeLanguage(Language.TURKISH)}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
