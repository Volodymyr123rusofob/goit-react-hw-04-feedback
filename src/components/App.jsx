import { useState } from 'react';
import FeedbackOptions from './Feedback/feedbackOptions/FeedbackOptions';
import Statistics from './Feedback/statistics/Statistics';
import Section from './Feedback/section/Section';
import Notification from './Feedback/notification/Notification';

import style from './app.module.css';

const App = () => {
  const [value, setValue] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const { good, neutral, bad } = value;

  const curentFeedback = option => {
    setValue(prevValue => {
      return {
        ...prevValue,
        [option]: prevValue[option] + 1,
      };
    });
  };

  const countTotalFeedback = ({ good, neutral, bad }) => {
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = (good, total) => {
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const total = countTotalFeedback(value);
  const positivePercentage = countPositiveFeedbackPercentage(good, total);

  return (
    <div className={style.box}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={Object.keys(value)}
          onLeaveFeedback={curentFeedback}
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
