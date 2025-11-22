import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import translationService from '@/services/api/translationService';

export const useTranslation = () => {
  const { currentLanguage } = useSelector(state => state.language);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const translationData = await translationService.getTranslations(currentLanguage);
        setTranslations(translationData);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const t = (key, fallback = key) => {
    return translations[key] || fallback;
  };

  return { t, currentLanguage };
};