import React, { useState } from 'react';

const FeedbackPrompt = ({ onFeedbackSubmit }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    onFeedbackSubmit(feedback);
  };

  return (
    <div className="feedback-prompt">
      <h2>Did the session take place?</h2>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Provide your feedback..."
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default FeedbackPrompt;
