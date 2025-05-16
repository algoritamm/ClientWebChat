'use client';

import { useEffect, useRef } from "react";

export function useConnectionsHandler(inputMessageRef, setChatMessages, role, username) {
    const socketRef = useRef(null);

    useEffect(() => {
        // WebSocket connection
        socketRef.current = new WebSocket("ws://localhost:8000"); 

        // If connection is open
        socketRef.current.onopen = () => {
            console.log("WebSocket connected");
        };

        // Recieve new message
        socketRef.current.onmessage = async (event) => {
            try {
                let messageData;

                if (typeof event.data === 'string') {
                  messageData = JSON.parse(event.data);
                } else if (event.data instanceof Blob) {
                  const text = await event.data.text();
                  messageData = JSON.parse(text);
                } else {
                  console.warn("Unknown message type:", event.data);
                  return;
                }

                // Update local storage
                //const chatToken = JSON.parse(localStorage.getItem("chatToken")) || { token: "", messages: [] };
                //chatToken.messages.push(messageData);
                //localStorage.setItem("chatToken", JSON.stringify(chatToken));

                // Send into frontend
                 setChatMessages(prev => {
                    const exists = prev.some(m => m.id === messageData.id);
                    if (exists) return prev;

                    const updated = [...prev, messageData];
                    localStorage.setItem("chatToken", JSON.stringify({
                        token: JSON.parse(localStorage.getItem("chatToken"))?.token || "",
                        messages: updated
                    }));
                    return updated;
                });

                // Sync
                window.dispatchEvent(new Event("newChatMessage"));
            } catch (err) {
                console.error("Error parsing WebSocket message:", err);
            }
        };

        // Error
        socketRef.current.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        // Close
        socketRef.current.onclose = () => {
            console.log("WebSocket disconnected");
        };

        // Clean up
        return () => {
            socketRef.current?.close();
        };
    }, [setChatMessages, role, username]);

    // Send message
    const sendMessageThroughSocket = (messageObj) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(messageObj));
        } else {
            console.warn("WebSocket is not connected.");
        }
    };

    return { sendMessageThroughSocket };
}