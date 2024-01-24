import { useState } from 'react';
import FeedbackOptions from './Feedback/feedbackOptions/FeedbackOptions';
import Statistics from './Feedback/statistics/Statistics';
import Section from './Feedback/section/Section';
import Notification from './Feedback/notification/Notification';

import style from './app.module.css';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const value = { good, neutral, bad };

  const currentFeedback = option => {
    switch (option) {
      case 'good':
        setGood(prevValue => prevValue + 1);
        break;
      case 'neutral':
        setNeutral(prevValue => prevValue + 1);
        break;
      case 'bad':
        setBad(prevValue => prevValue + 1);
        break;
      default:
        console.error('ERROR: Not case');
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const total = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();

  return (
    <div className={style.box}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(value)}
          onLeaveFeedback={currentFeedback}
        />
      </Section>
      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback." />
        )}
      </Section>
    </div>
  );
};

export default App;
