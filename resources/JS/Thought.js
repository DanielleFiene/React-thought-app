import React from 'react';
import { useEffect } from 'react';

export function Thought(props) {
  const { thought, removeThought } = props;

  const handleRemoveClick = () => {
    removeThought(thought.id);
  };

  useEffect(() => {
    const timeRemaining = thought.expiresAt - Date.now();

    // Only set the timeout if timeRemaining is greater than 0
    if (timeRemaining > 0) {
      const timeout = setTimeout(() => {
        removeThought(thought.id);
      }, timeRemaining);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      // If timeRemaining is not greater than 0, remove the thought immediately
      removeThought(thought.id);
    }
  }, [thought, removeThought]);

  return (
    <li className="Thought">
      <button
        aria-label="Remove thought"
        className="remove-button"
        onClick={handleRemoveClick}
      >
        &times;
      </button>
      <div className="text">{thought.text}</div>
    </li>
  );
}
