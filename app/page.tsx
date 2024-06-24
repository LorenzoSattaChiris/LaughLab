"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Header from "./components/Header";
import { Settings } from "./components/Settings";
import Chat from "./components/Chat";

export default function Page() {

  const [gotMessages, setGotMessages] = useState(false);

  const [settingsState, setSettingsState] = useState({
    topic: "Work",
    tone: "Happy",
    temperature: 0.7
  });


  const { messages, append, setMessages } = useChat({
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-800 p-2 mx-auto max-w-full">
      <Header className="my-5" />

      <div className="flex w-full flex-grow overflow-hidden relative">
        <Chat
          append={append}
          messages={messages}
          settings={settingsState}
          setMessages={setMessages}
        />
        <div className="absolute transform translate-x-full transition-transform duration-500 ease-in-out right-0 w-2/3 overflow-y-auto lg:static lg:translate-x-0 lg:w-2/5 lg:mx-2 rounded-lg h-auto max-h-full">
          <Settings
            className=""
            state={settingsState}
            setState={setSettingsState}
          />
        </div>
        <button
          type="button"
          className="absolute left-20 transform -translate-x-12 bg-gray-800 text-white rounded-l py-2 px-4 lg:hidden"
          onClick={(e) => {
            e.currentTarget.parentElement
              ?.querySelector(".transform")
              ?.classList.toggle("translate-x-full");
          }}
        >
          ☰
        </button>
      </div>
    </div>
  );
}