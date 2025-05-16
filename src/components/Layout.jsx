'use client'

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import _settings from '../../appsettings.json'
import { useFileUpload  } from '@/hooks/useFileUpload';
import { useMessagesHandler } from "@/hooks/useMessagesHandler";
import { useConnectionsHandler } from "@/hooks/useConnectionsHandler";
import ChatHistory from "@/components/ChatHistory";
import { generateUUID } from "@/utilis/generateUUID";

export default function Layout({ username, role}) {
    const {t} = useTranslation();

    const chatWindow = useRef(null);
    const inputFile = useRef(null);
    const inputMessage = useRef(null);

    const [isChatOpen, setIsChatOpen] = useState(true);

    const [token, setToken] = useState(() => {
        const stored = localStorage.getItem("chatToken");
        if (stored) return JSON.parse(stored).token;
        const newToken = generateUUID();
        localStorage.setItem("chatToken", JSON.stringify({ token: newToken, messages: [] }));
        return newToken;
    });

    const [selectedFile, setSelectedFile] = useState(null);

    const [chatMessages, setChatMessages] = useState(() => {
        const stored = localStorage.getItem("chatToken");
        return stored ? JSON.parse(stored).messages : [];
    });

    const { sendMessageThroughSocket } = useConnectionsHandler(inputMessage, setChatMessages, role, username);
    const { sendMessage, sendAttachment } = useMessagesHandler(inputMessage, sendMessageThroughSocket, role, username, setChatMessages);

    const { uploadFiles } = useFileUpload((file) => {
        setSelectedFile(file);
        sendAttachment(file);
    });

    useEffect(() => {
        if (!localStorage.getItem("chatToken")) {
            localStorage.setItem("chatToken", JSON.stringify({ token: token, messages: [] }));
        }
    }, [token]);

    useEffect(() => {
        const stored = localStorage.getItem("chatToken");
        const parsed = stored ? JSON.parse(stored) : null;
        if (parsed && parsed.messages) {
            setChatMessages(parsed.messages);
        }
    }, []);

    useEffect(() => {
        if (chatWindow.current) {
            chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
        }
    }, [chatMessages]);

    useEffect(() => {
        if (isChatOpen && chatWindow.current) {
            setTimeout(() => {
                chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
            }, 0);
        }
    }, [isChatOpen]);

    useEffect(() => {
        const updateChat = () => {
            const parsed = JSON.parse(localStorage.getItem("chatToken"));
            if (parsed?.messages) setChatMessages([...parsed.messages]);
        };
        window.addEventListener("newChatMessage", updateChat);
        return () => window.removeEventListener("newChatMessage", updateChat);
    }, []);

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    const closeChat = () => {
        setIsChatOpen(false);
    };
    console.log(chatMessages)
    return (
        <main>
            <div className="content">
		        <img src="/img/Logo.png" alt="Logo page" />
	        </div>
                <div className="chat-icon" id="chat-icon" onClick={toggleChat}>
                    <img src="https://img.icons8.com/ios-filled/50/ffffff/chat.png" alt="chat"/>
                </div>
                {isChatOpen && (
                    <div className={`chat-container ${isChatOpen ? 'open' : ''}`} id="chat-container">
                    <div className="chat-header" >
                        <p>{username === "agent" ? t("Agent:")+ " " + username : username }</p>
                        <div className="close-chat" id="close-chat" onClick={closeChat}>
                            <img src="https://img.icons8.com/?size=20&id=8112&format=png&color=ffffff" alt="close"/>
                        </div>
                    </div>
                    <div className="chat-window" id="chat-window" ref={chatWindow}>
                        <ChatHistory  messages={chatMessages} />
                    </div>
                    <div id="progress-container">
                        <div id="progress-bar"></div>
                    </div>
                    <div className="chat-input-area">
                        <button id="upload-btn" onClick = {() => {uploadFiles(inputFile)}} >
                            <img src="https://img.icons8.com/?size=30&id=59728&format=png&color=0fa1d1" alt="attachment"/>
                        </button>           
                        <input type="text" id="message-input" ref={inputMessage} placeholder={t("Write a message")}/>
                        <input type="file" id="file-input" ref={inputFile} style={{ display: "none"}} accept={_settings.AllowedExtensions}/>  
                        <button id="send-btn" onClick= { () => {sendMessage()}}>
                            <img src="https://img.icons8.com/?size=30&id=100004&format=png&color=0fa1d1" alt="send"/>
                        </button>     
                    </div>
                </div>
                )}
            </main>
    );
}