import { useLanguageContext } from '../context/LanguageProvider';
import '../../utils/Settings.css';

export default function SettingsRight() {
  const { translations, language, changeLanguage } = useLanguageContext();
  const t = translations[language];

  const languageOptions = [
    { label: 'English', flag: 'https://flagpedia.net/data/flags/w580/gb.png' },
    { label: 'Filipino', flag: 'https://flagpedia.net/data/flags/w580/ph.png' },
  ];
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#FFF',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          maxWidth: '300px',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <h2 style={{ fontSize: '1rem', marginBottom: '10px', color: '#5594dc' }}>
          {t.chooselang}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {languageOptions.map((option) => (
            <div
              key={option.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 15px',
                backgroundColor: option.label === language ? '#007BFF' : '#f1f1f1',
                color: option.label === language ? '#fff' : '#333',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
              }}
              onClick={() => changeLanguage(option.label)}
            >
              {/* Add the flag image */}
              <img
                src={option.flag}
                alt={`${option.label} flag`}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  marginRight: '10px',
                }}
              />
              {option.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}  