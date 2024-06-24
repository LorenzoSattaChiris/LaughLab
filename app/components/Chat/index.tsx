// Chat.tsx

import Messages from "./Messages";
import { Message } from "ai/react";
import { Button } from "../Button";
import { ISettingsState } from "../Settings/interface";

interface Chat {
    append: any;
    messages: Message[];
    settings: ISettingsState;
    setMessages: (messages: Message[]) => void;
}

const Chat: React.FC<Chat> = ({
    append,
    messages,
    settings,
    setMessages
}) => {
    return (
        <div id="chat" className="flex flex-col w-full lg:w-3/5 mr-4 mx-5 lg:mx-0">
            <Messages messages={messages} />
            <div className="space-x-2 flex flex-row items-start sticky w-full">
                <Button
                    className="flex-1 my-2 uppercase active:scale-[98%] transition-transform duration-100"
                    style={{
                        backgroundColor: "#4f6574",
                        color: "white",
                    }}
                    onClick={() =>
                        append({
                            role: "user",
                            content: `Generate a joke about ${settings.topic} in a ${settings.tone} tone`,
                        }, {
                            options: {
                                body : {
                                    temperature: 0
                                }
                            }
                        })}
                >
                    Generate Joke
                </Button>
                <Button
                    className="flex-1 my-2 uppercase active:scale-[98%] transition-transform duration-100"
                    style={{
                        backgroundColor: "#4f6574",
                        color: "white",
                    }}
                    onClick={() =>
                        append({
                            role: "user",
                            content: `Critically evaluate whether the joke is funny or not.`,
                        })}
                >
                    Evaluate Joke
                </Button>
                <Button
                    className="flex-1 my-2 uppercase active:scale-[98%] transition-transform duration-100"
                    style={{
                        backgroundColor: "#4f6574",
                        color: "white",
                    }}
                onClick={() => setMessages([])}
                >
                    Reset
                </Button>
            </div>
        </div>
    );
};

export default Chat;