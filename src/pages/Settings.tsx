import '../../utils/Settings.css';
import SettingsLeft from '../components/Settingsleft';
import SettingsRight from '../components/SettingsRight';
import { LanguageProvider, useLanguageContext } from '../context/LanguageProvider'; 

export default function Settings() {
  const { language } = useLanguageContext();

  return (
    <LanguageProvider> 
      <div className="settings-container"> 
        <SettingsLeft key={language} />
        <SettingsRight key={language} />
      </div>
    </LanguageProvider>
  );
}
