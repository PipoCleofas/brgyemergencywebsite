import ComboBox from '../components/comboboxholder/Combobox';
import { useLanguageContext } from '../context/LanguageProvider';

export default function SettingsRight() {
  const { translations, language, changeLanguage } = useLanguageContext();
  const t = translations[language];

  const data = [
    { label: 'English', value: 'English' },
    { label: 'Filipino', value: 'Filipino' },
  ];

  return (
    <div className="right-side">
      <div className="language-selection">
        <h3>{t.chooselang}</h3>
        <ComboBox onValueChange={changeLanguage} data={data} value={language} />
      </div>
    </div>
  );
}
