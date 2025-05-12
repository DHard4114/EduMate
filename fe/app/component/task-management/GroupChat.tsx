'use client'
import { useState } from 'react';

const GroupChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John', text: 'Has everyone started on their tasks? This is a very long message that should wrap to the next line to demonstrate how long messages will be handled in the chat interface.', time: '10:30 AM' },
        { id: 2, sender: 'Sarah', text: 'I\'m working on the design mockups', time: '10:32 AM' },
        { id: 3, sender: 'Mike', text: 'I\'ll start coding the frontend today. This is another long message to test the wrapping functionality of the chat bubbles.', time: '10:35 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                { id: Date.now(), sender: 'You', text: newMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
            ]);
            setNewMessage('');
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 p-3 overflow-y-auto max-h-60">
                {messages.map(message => (
                    <div key={message.id} className="mb-3 break-words p-2 rounded-2xl bg-green">
                        <div className="flex justify-between items-baseline ">
                            <span className="font-semibold">{message.sender}</span>
                            <span className="text-xs text-fontgreen">{message.time}</span>
                        </div>
                        <p className="text-sm mt-1 whitespace-pre-wrap">{message.text}</p>
                    </div>
                ))}
            </div>
            
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-l focus:outline-none focus:ring-1 focus:ring-fontgreen bg-white text-gray-800"
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button
                    onClick={handleSend}
                    className="bg-green text-white px-4 rounded-r hover:bg-fontgreen"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default GroupChat;