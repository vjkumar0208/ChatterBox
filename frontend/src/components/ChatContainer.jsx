import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex items-end gap-1 ${message.senderId === authUser._id ? "justify-end" : "justify-start"}`}
            ref={messageEndRef}
          >
            {message.senderId !== authUser._id && (
              <ArrowLeft className="size-3 xs:size-4 text-base-content/50" />
            )}
            <div
              className={`
                w-fit max-w-[160px] xs:max-w-[200px] sm:max-w-[280px] rounded-xl p-2 xs:p-3 shadow-sm
                ${message.senderId === authUser._id ? "bg-primary text-primary-content" : "bg-base-200"}
              `}
            >
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="max-w-full rounded-md mb-1 xs:mb-2"
                />
              )}
              {message.text && <p className="whitespace-pre-wrap break-words text-xs xs:text-sm">{message.text}</p>}
              <p
                className={`
                  text-[10px] xs:text-xs opacity-70 mt-0.5 xs:mt-1 text-right
                  ${message.senderId === authUser._id ? "text-primary-content" : "text-base-content"}
                `}
              >
                {formatMessageTime(message.createdAt)}
              </p>
            </div>
            {message.senderId === authUser._id && (
              <ArrowRight className="size-3 xs:size-4 text-base-content/50" />
            )}
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
