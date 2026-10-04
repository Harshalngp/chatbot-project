import dayjs from 'dayjs';
import { useState } from 'react'
import { Chatbot } from 'supersimpledev';
import './ChatInput.css';

//  Component Function 
export function ChatInput({ chatMessages, setChatMessages }) {
  // Fragment (<></>)

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  async function sendMessage() {

    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);
    setInputText('');

    const newChatMessages = [
      ...chatMessages,     //  spread operator = takes the values in an array and copies them into a new array
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]

    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be remove later, when we add the response.
      {
        message: 'Loading...',
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages,     //  spread operator = takes the values in an array and copies them into a new array
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]);

    setIsLoading(false);
  }

  return (
    <div className="chat-input-container">
      <input placeholder="Send a message to Chatbot" size="30" onChange={saveInputText} value={inputText} onKeyDown={handleKeyDown} className="chat-input" />
      <button className="send-button" onClick={sendMessage}>Send</button>
    </div>
  );
}
