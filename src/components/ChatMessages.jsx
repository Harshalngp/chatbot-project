import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);

  //  Arrow function = works the same way as a function, but it's shorter
  return (
    <div className="chat-messages-container" ref={chatMessagesRef} >
      {
        chatMessages.map((chatMessage) => {
          return (
            <ChatMessage
              message={chatMessage.message}
              sender={chatMessage.sender}
              time={chatMessage.time}
              key={chatMessage.id}
            />
          );
        })
      }
    </div>
  );
}

export default ChatMessages;
