'use client';

import ChatMessage from './ChatMessage';

export default function ChatHistory({ messages }) {
    return (
        <>
            {messages.map((element, index) => (
                <ChatMessage
                    key={index}
                    message={element.message}
                    senderType={element.senderType}
                    isAttachment={element.isAttachment}
                    filename={element.filename}
                    mimeType={element.mimeType}
                    nickname={element.senderName}
                    timestamp={element.timestamp}
                />
            ))}
        </>
    );
}
