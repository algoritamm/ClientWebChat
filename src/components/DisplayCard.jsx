'use client'
import React from 'react';
import { useTranslation } from 'react-i18next';
import useSendMessage from '@/services/renderChatHistory';

export default function CardMessage({ card, senderType }) {
  const { t } = useTranslation();
  const sendMessage = useSendMessage();

  if (!card) return null;

  return (
    <div className={`card ${senderType === 'agent' ? 'message-agent' : 'message-user'}`}>
      {card.image && (
        <img src={card.image} alt={card.title || t("Image")} className="card-image" />
      )}

      {card.title && (
        <h3 className="card-title">{card.title}</h3>
      )}

      {card.description && (
        <p className="card-description">{card.description}</p>
      )}

      {card.actions?.length > 0 && (
        <div className="card-actions">
          {card.actions.map((action, index) => {
            if (action.type === 'Link') {
              return (
                <a
                  key={index}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                >
                  {action.text}
                </a>
              );
            } else if (action.type === 'Postback') {
              return (
                <button
                  key={index}
                  className="card-postback"
                  onClick={() => sendMessage(action.payload)}
                >
                  {action.text}
                </button>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
