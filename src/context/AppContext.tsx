import React, {ReactNode, createContext, useEffect, useState} from 'react';
import {Language, Period} from '../enums';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextProps {
  selectedPeriod: Period;
  updatePeriod: (period: Period) => void;
  language: Language;
  updateLangu: (langu: Language) => void;
}

const AppContext = createContext<AppContextProps>({
  selectedPeriod: Period.WEEKLY,
  updatePeriod: () => {},
  language: Language.ENGLISH,
  updateLangu: () => {},
});

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(Period.WEEKLY);
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);

  const updatePeriod = async (period: Period) => {
    await AsyncStorage.setItem('selectedPeriod', period);

    setSelectedPeriod(period);
  };

  const updateLangu = async (langu: Language) => {
    await AsyncStorage.setItem('language', langu);

    setLanguage(langu);
  };

  const getSavedPeriod = async () => {
    const savedPeriod = await AsyncStorage.getItem('selectedPeriod');
    if (savedPeriod) {
      setSelectedPeriod(savedPeriod as Period);
    }
  };

  const getLanguage = async () => {
    const language = await AsyncStorage.getItem('language');
    if (language) {
      setLanguage(language as Language);
    }
  };

  useEffect(() => {
    getSavedPeriod();
    getLanguage();
  }, []);

  return (
    <AppContext.Provider
      value={{selectedPeriod, updatePeriod, language, updateLangu}}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppProvider};
