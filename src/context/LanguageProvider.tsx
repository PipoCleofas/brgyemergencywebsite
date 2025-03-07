import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of the LanguageContext data
interface LanguageContextProps {
  language: string;
  changeLanguage: (lang: string) => void;
  translations: {
    [key: string]: {
      greeting: string;
      viewRequest: string;
      approval: string;
      approval1: string;
      approved: string;
      rejected: string;
      home: string;
      settings: string;
      approve: string;
      reject: string;
      police: string;
      firefighter: string;
      medical: string;
      serviceprovidernumber: string;
      serviceprovider: string;
      chooselang: string;
      language_desc: string;
      asstreport: string;
      citizens: string;
      disaster: string;
      users: string;
      usermanagement: string;
      firstname: string;
      middlename: string;
      lastname: string;
      birthday: string;
      frontid: string;
      backid: string;
      status: string;
      view: string;
      name: string;
      type: string;
      date: string;
      location: string;
      respondent: string;
      comment: string;
      message: string;
      transferlogs: string;
    };
  };
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

// Define the provider component props
interface LanguageProviderProps {
  children: ReactNode;
}

// LanguageProvider component to wrap the app with language context
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Retrieve the initial language from localStorage or default to English
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem('language') || 'English';
  });

  // Save the selected language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to change the language
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  // Translations object containing strings for different languages
  const translations = {
    English: {
      greeting: 'Hello',
      viewRequest: 'View Request',
      approval: 'Approval',
      approval1: 'APPROVAL',
      approved: 'Approved',
      rejected: 'Rejected',
      home: 'Home',
      settings: 'Settings',
      transferlogs: 'Transfer Logs',
      approve: 'Approve',
      reject: 'Reject',
      police: 'Police',
      firefighter: 'Firefighter',
      medical: 'Medical',
      serviceprovidernumber: 'Number of Registered Service Providers',
      chooselang: 'Select Language:',
      language_desc: 'Choose your preferred language for the application.',
      asstreport: 'Assistance Report',
      serviceprovider: 'SERVICE PROVIDERS',
      citizens: 'CITIZENS',
      disaster: 'Disaster',
      users: 'Users',
      usermanagement: 'User Management',
      firstname: 'FIRST NAME',
      middlename: 'MIDDLE NAME',
      lastname: 'LAST NAME',
      birthday: 'BIRTHDAY',
      frontid: 'FRONT ID',
      backid: 'BACK ID',
      status: 'STATUS',
      view: 'View',
      name: 'NAME',
      type: 'TYPE',
      date: 'DATE',
      location: 'LOCATION',
      respondent: 'RESPONDENT',
      comment: 'COMMENT',
      message: 'MESSAGE',
    },
    Filipino: {
      greeting: 'Kamusta',
      viewRequest: 'Tingnan ang Kahilingan',
      approval: 'Pag-apruba',
      approval1: 'PAG-APRUBA',
      approved: 'Inaprubahan',
      rejected: 'Tinanggihan',
      home: 'Bungad',
      settings: 'Mga Setting',
      transferlogs: 'Mga Log ng Paglilipat',
      approve: 'Aprubahan',
      reject: 'Tanggihan',
      police: 'Pulis',
      firefighter: 'Bumbero',
      medical: 'Medikal',
      serviceprovidernumber: 'Bilang ng Mga Rehistradong Tagabigay ng Serbisyo',
      chooselang: 'Pumili ng wika:',
      language_desc: 'Mamili ng wika para as application.',
      asstreport: 'Ulat ng Tulong',
      serviceprovider: 'TAGAPAGBIGAY NG SERBISYO',
      citizens: 'MGA MAMAMAYAN',
      disaster: 'Sakuna',
      users: 'Mga Users',
      usermanagement: 'Pagmamanage ng User',
      firstname: 'UNANG PANGALAN',
      middlename: 'GITNANG PANGALAN',
      lastname: 'APELYIDO',
      birthday: 'KAARAWAN',
      frontid: 'HARAP NA ID',
      backid: 'LIKOD NA ID',
      status: 'ISTADO',
      view: 'Tignan',
      name: 'PANGALAN',
      type: 'URI',
      date: 'PETSA',
      location: 'LOKASYON',
      respondent: 'RUMERESPONDE',
      comment: 'KOMENTARYO',
      message: 'MENSAHE',
    },
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to access LanguageContext
export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};