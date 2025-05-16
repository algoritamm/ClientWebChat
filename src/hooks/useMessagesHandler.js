'use client';

import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import ChatMessage from "@/components/ChatMessage";
import { createRoot } from 'react-dom/client';
import _settings from '../../appsettings.json';
import { v4 as uuidv4 } from 'uuid';


export function useMessagesHandler(messageRef, sendMessageThroughSocket, role, username, setChatMessages) {
    const {t} = useTranslation();

    const updateLocalMessages = (newMessage) => {
        const chatToken = JSON.parse(localStorage.getItem("chatToken") || '{"token": "", "messages": []}');
        chatToken.messages.push(newMessage);
        localStorage.setItem("chatToken", JSON.stringify(chatToken));
    };

    const appendMessageToDOM = (messageProps) => {
        const chatWindow = document.getElementById("chat-window");
        if (!chatWindow) return;

        const div = document.createElement("div");
        chatWindow.appendChild(div);

        const root = createRoot(div);
        root.render(<ChatMessage {...messageProps} />);

        chatWindow.scrollTop = chatWindow.scrollHeight;
    };

    const sendMessage = useCallback(() => {
        const messageText = messageRef?.current?.value?.trim();
        if (!messageText) return;

        const newMessage = {
            id: uuidv4(),
            message: messageText,
            senderType: role,
            senderName: username,
            isAttachment: false,
            filename: "",
            mimeType: "text",
            timestamp: new Date().toISOString()
        };

        //appendMessageToDOM(newMessage);
        setChatMessages(prev => {
            const updated = [...prev, newMessage];
            localStorage.setItem("chatToken", JSON.stringify({
                token: JSON.parse(localStorage.getItem("chatToken"))?.token || "",
                messages: updated
            }));
            return updated;
        });

        updateLocalMessages(newMessage);
        sendMessageThroughSocket({ ...newMessage, token: JSON.parse(localStorage.getItem("chatToken"))?.token });
        messageRef.current.value = "";
    }, [messageRef, sendMessageThroughSocket, role, username]);

    const sendAttachment = useCallback((file) => {
        if (!file) return;

        const allowedExtensions = _settings.AllowedExtensions.split(",").map(e => e.trim().toLowerCase());
        const fileExtension = "." + file.name.split(".").pop().toLowerCase();

        const timestamp = new Date().toISOString();
        const blobUrl = URL.createObjectURL(file);

        const messageData = {
            id: uuidv4(),
            message: blobUrl,
            senderType: role,
            senderName: username,
            isAttachment: true,
            filename: file.name,
            mimeType: file.type,
            timestamp: timestamp
        };

        if (!allowedExtensions.includes(fileExtension)) {
            //appendMessageToDOM({ ...messageData, message: t("Not allowed file extension."), isAttachment: false });
            const warningMessage = {
                ...messageData,
                message: t("Not allowed file extension."),
                isAttachment: false
            };

            setChatMessages(prev => [...prev, warningMessage]);
            return;
        }

        //appendMessageToDOM(messageData);
        setChatMessages(prev => {
            const updated = [...prev, newMessage];
            localStorage.setItem("chatToken", JSON.stringify({
                token: JSON.parse(localStorage.getItem("chatToken"))?.token || "",
                messages: updated
            }));
            return updated;
        });

        updateLocalMessages(messageData);
        sendMessageThroughSocket({ ...messageData, token: JSON.parse(localStorage.getItem("chatToken"))?.token });
    }, [t]);

    return { sendMessage, sendAttachment };
}