import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '@/store/slices/languageSlice';
import { cn } from '@/utils/cn';
import ApperIcon from '@/components/ApperIcon';

const languages = [
  { code: 'ar', name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'en', name: 'English', flag: '🇺🇸', dir: 'ltr' }
];

const LanguageSelector = ({ className }) => {
  const dispatch = useDispatch();
  const { currentLanguage, direction } = useSelector(state => state.language);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (language) => {
    dispatch(setLanguage(language.code));
    document.documentElement.dir = language.dir;
    document.documentElement.lang = language.code;
    setIsOpen(false);
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="text-sm font-medium text-gray-700">{currentLang?.name}</span>
        <ApperIcon 
          name="ChevronDown" 
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 end-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2 text-start hover:bg-gray-50 transition-colors duration-200",
                "first:rounded-t-lg last:rounded-b-lg",
                currentLanguage === language.code && "bg-primary/5 text-primary"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm font-medium">{language.name}</span>
              {currentLanguage === language.code && (
                <ApperIcon name="Check" className="h-4 w-4 ms-auto text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;