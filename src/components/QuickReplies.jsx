'use client'
import React from "react";
import { useTranslation } from "react-i18next";

export default function QuickReplies({contentArray, senderType, questionText }) {
    const { t } = useTranslation();

    const handleClick = () => {
        if (onOptionSelected) {
            onOptionSelected(); // Remove button QuickReply
        }
    };

    return (
        <div className="quick-reply-container">
            {questionText && (
                <div className={`message ${senderType === 'agent' ? 'message-agent' : 'message-user'}`}>
                    {questionText}
                </div>
            )}

            <div className="quick-replies">
                {contentArray.map((content, index) =>
                    content.contentType === "QuickReply" ? (
                        <button key={index} className="quick-reply-button" onClick={() => handleClick(content.quickReply.payload, content.quickReply.text)}>
                            {t(content.quickReply.text)}
                        </button>
                    ) : null
                )}
            </div>
        </div>
    );
}