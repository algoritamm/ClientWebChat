'use client'
import React from "react";
import { useTranslation } from "react-i18next";
import _settings from '../../appsettings.json';

export default function ChatMessage({message, senderType, isAttachment = false, filename = '', mimeType = '', nickname = '', timestamp = ''}) {
    const { t } = useTranslation();

    if (!message && !isAttachment) {
        console.warn("Empty message");
        return null;
    }

    return (
        <div className={`message ${senderType === 'agent' ? 'message-agent' : 'message-user'}`}>
            {senderType === 'agent' && nickname && (
                <div className="message-header">
                    <span className="agent-nickname">{nickname}</span>
                </div>
            )}

            <div className="message-content">
                {isAttachment ? (
                    mimeType === 'image/png' || mimeType === 'image/jpeg' ? (
                        <img
                            src={message}
                            alt={filename}
                            className="chat-image"
                            style={{ maxWidth: '200px', maxHeight: '200px' }}
                        />
                    ) : (
                        <p>
                            <a href={message} target="_blank" className="download-btn">
                                {t("Download the file")}: {filename}
                            </a>
                        </p>
                    )
                ) : (
                    <p>{formatMessageWithLinks(message)}</p>
                )}
            </div>

            {timestamp && (
                <div className="message-footer">
                    <span className="message-time">{formatTime(timestamp)}</span>
                </div>
            )}
        </div>
    );
}

/* Private helpers */
function formatMessageWithLinks(message) {
    if (!message) return '';
    
    try {
        //formatting Markdown links [text](url)
        message = message.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        //formatting plain URLs that aren't arleady in links 
        message = message.replace(/(^|\s)(https?:\/\/[^\s]+)(?![^<]*>|[^<>]*<\/a>)/g, '$1<a href="$2" target="_blank">$2</a>');
        
        return message;
    } catch (error) {
        console.warn("Error formating message:", error);
        return message;
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    const format = _settings.LanguageResources;
    return format === "en"
        ? date.toLocaleTimeString()
        : date.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
}
