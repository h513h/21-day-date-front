import React from 'react';
import { useAppContext } from '../AppContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { currentWeek } = useAppContext();
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="row">
        <div className="col-8">
          <h1>21-day</h1>
          <h1>Date Challenge</h1>
        </div>
        <div className="col-4 d-flex justify-content-end">
          <h2 className="pe-2">Week</h2>
          <h2 style={{ fontSize: '100px', lineHeight: '80px' }}>{currentWeek}</h2>
        </div>
      </div>
      <div className="row mt-2">
        {currentWeek > 3 && (
            <div>
              <p className="mt-2">{t('congratulations')}</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default Header;