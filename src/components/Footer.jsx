// src/components/Footer.jsx
import React from 'react';
import { useAppContext } from '../AppContext';

const Footer = () => {
  const { changeLanguage, language } = useAppContext();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value); // 切換語言
  };

  return (
    <div className="d-flex justify-content-between">
      <select id="language-select" onChange={handleLanguageChange} value={language}>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
      </select>
      <div className="footer text-center">© 2024 Yihan Hsieh</div>
    </div>
  )
};

export default Footer;
