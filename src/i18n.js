// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "home": "Home",
          "in_progress": "In progress",
          "completed": "Completed",
          "no_processing_task_alert": "You're not working on any challenge at the moment! Pick one below and create some sweet memories with your partner. Have fun together!",
          "congratulations": "Yay! Congratulations on completing the 21 date-challenge! You and your partner are amazing! Here's to all the sweet memories and love you've built along the way!",
          "alert": "You're in the middle of a challenge right now! Once you've completed it, feel free to explore and take on another one. You're doing great!",
          "record1": "You two amazing people have completed",
          "record2": "dates together!",
          "finish_before": "Finished before opening the app",
          "finish_now": "Finish now",
          "rest": "Take a rest this time",
          "try": "Try other one!",
          "record_today": "Record for today",
          "feeling": "How's your feelings?",
          "both_happy": "Both of us are happy",
          "m_unhappy": "The male partner is not happy",
          "f_unhappy": "The female partner is not happy",
          "unhappy": "Both of us are not happy",
          "comment_f": "Comment from the female partner",
          "comment_m": "Comment from the male partner",
          "return": "Return",
          "submit": "Submit"
        }
      },
      zh: {
        translation: {
          "home": "首頁",
          "in_progress": "進行中",
          "completed": "完成",
          "no_processing_task_alert": "現在沒有正在進行的挑戰！從首頁選一個,和你的伴侶一起創造甜蜜的回憶吧。好好享受彼此的時光!",
          "congratulations": "耶！恭喜完成了 21 天的約會挑戰！你和你的伴侶真的很棒！為你們一路上建立的美好回憶和愛乾杯！",
          "alert": "正好在挑戰的過程中！完成後，隨時可以去嘗試下一個挑戰。你們表現得非常出色！",
          "record1": "你們兩位了不起的人一起完成了",
          "record2": "次約會！",
          "finish_before": "早就完成了",
          "finish_now": "做完了",
          "rest": "休息一次",
          "try": "試試看其他的",
          "record_today": "今日的紀念",
          "feeling": "兩位的感覺如何？",
          "both_happy": "雙方都很開心",
          "m_unhappy": "男生不開心",
          "f_unhappy": "女生不開心",
          "unhappy": "雙方都不開心",
          "comment_f": "女生今天的心得",
          "comment_m": "男生今天的心得",
          "return": "返回",
          "submit": "提交"
        }
      },
      ja: {
        translation: {
          "home": "ホーム",
          "in_progress": "進行中",
          "completed": "完成",
          "no_processing_task_alert": "今、どのチャレンジにも取り組んでいません！ホームから一つ選んで、パートナーと一緒に素敵な思い出を作りましょう。楽しんでくださいね!",
          "congratulations": "やった！21日間のデートチャレンジを達成したおめでとうございます！あなたとパートナーは本当に素晴らしいです！これまでに築き上げた甘い思い出と愛に乾杯！",
          "alert": "現在、挑戦中ですね！終わったら、ぜひ新しいチャレンジにも挑戦してみてください。絶好調ですよ！",
          "record1": "二人の素晴らしいカップルは一緒に",
          "record2": "回のデートを完了しました！",
          "finish_before": "開ける前に完成した",
          "finish_now": "完成した",
          "rest": "今回は休憩",
          "try": "他のをしてみる",
          "record_today": "今日の記念",
          "feeling": "今日の感じは？",
          "both_happy": "二人とも楽しかった",
          "m_unhappy": "彼氏は楽しくなかった",
          "f_unhappy": "彼女は楽しくなかった",
          "unhappy": "二人とも楽しくなかった",
          "comment_f": "彼女今日の感想",
          "comment_m": "彼氏今日の感想",
          "return": "戻る",
          "submit": "提出"
        }
      }
    },
    lng: 'en', // 預設語言
    fallbackLng: 'en', // 備用語言
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;