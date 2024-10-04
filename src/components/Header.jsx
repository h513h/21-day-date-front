import React from 'react';
import { useAppContext } from '../AppContext';

const Header = () => {
  const { currentWeek } = useAppContext();

  return (
    <div className="header row">
      <div className="col-8">
        <h1>21-day</h1>
        <h1>Date Challenge</h1>
        {currentWeek > 3 && (
          <div>
            <p className="mt-2">耶！恭喜完成了 21 天的約會挑戰！你和你的伴侶真的很棒！為你們一路上建立的美好回憶和愛乾杯！</p>
            <p className="mt-2">やった！21日間のデートチャレンジを達成したおめでとうございます！あなたとパートナーは本当に素晴らしいです！これまでに築き上げた甘い思い出と愛に乾杯！</p>
            <p className="mt-2">Yay! Congratulations on completing the 21 date-challenge! You and your partner are amazing! Here's to all the sweet memories and love you've built along the way!</p>
            <a href=""></a>
          </div>
        )}
      </div>
      <div className="col-4 d-flex justify-content-end">
        <h2 className="pe-2">Week</h2>
        <h2 style={{ fontSize: '100px', lineHeight: '80px' }}>{currentWeek}</h2>
      </div>
    </div>
  );
};

export default Header;