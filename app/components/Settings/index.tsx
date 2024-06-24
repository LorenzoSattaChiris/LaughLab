import React from "react";
import { topics } from "./topics";
import { tones } from "./tones";

import { Button } from "../Button";
import { ISettingsState } from "./interface";

interface SettingsProps {
    className: string;
    state: ISettingsState;
    setState:  React.Dispatch<React.SetStateAction<ISettingsState>>;
}

export const Settings: React.FC<SettingsProps> = ({ className, state, setState}) => {
    const defaultSettings: ISettingsState = {
        topic: "Work",
        tone: "Happy",
        temperature: 0.7
    }

    const resetToDefaultSettings = () => {
        setState(defaultSettings);
    }

    const handleChange = ({
        target: { name, value },
    }: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setState({
            ...state,
            temperature: value,
        });
    };

    const DropdownLabel: React.FC<
        React.PropsWithChildren<{ htmlFor: string }>
    > = ({ htmlFor, children }) => (
        <label htmlFor={htmlFor} className="text-white p-2 font-bold">
            {children}
        </label>
    );

    return (
        <div
            className={`flex flex-col border-2 overflow-y-auto rounded-lg bg-gray-700 border-gray-500 w-full ${className}`}
        >
            <div className="flex flex-col items-start sticky top-0 w-full">

                <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4 text-white">
                    <h3 className="text-xl font-semibold pl-4">Topic</h3>

                    <div className="flex flex-wrap">
                        {topics.map(({ value, emoji }) => (
                            <div
                                key={value}
                                className="p-4 m-2 bg-opacity-25 bg-gray-400 rounded-lg"
                            >
                                <input
                                    id={value}
                                    type="radio"
                                    value={value}
                                    name="topic"
                                    checked={state.topic === value}
                                    onChange={handleChange}
                                />
                                <label className="ml-2" htmlFor={value}>
                                    {`${emoji} ${value}`}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4 text-white">
                    <h3 className="text-xl font-semibold pl-4">Tone</h3>

                    <div className="flex flex-wrap">
                        {tones.map(({ value, emoji }) => (
                            <div
                                key={value}
                                className="p-4 m-2 bg-opacity-25 bg-gray-400 rounded-lg"
                            >
                                <input
                                    id={value}
                                    type="radio"
                                    value={value}
                                    name="tone"
                                    checked={state.tone === value}
                                    onChange={handleChange}
                                />
                                <label className="ml-2" htmlFor={value}>
                                    {`${emoji} ${value}`}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col w-full p-4">
                    <DropdownLabel htmlFor="chunkSize">
                        Temperature: {state.temperature}
                    </DropdownLabel>
                    <input
                        className="p-2 bg-gray-700"
                        type="range"
                        id="temperature"
                        min={0}
                        max={2}
                        step={0.01}
                        value={state.temperature}
                        onChange={handleTemperatureChange}
                    />
                </div>

                <div className="flex p-2"></div>
                <div className="text-left w-full flex flex-col rounded-b-lg bg-gray-600 p-3 subpixel-antialiased">
                    <div className="flex-grow w-full px-4">
                        <Button
                            className="w-full my-2 uppercase active:scale-[98%] transition-transform duration-100"
                            style={{
                                backgroundColor: "#4f6574",
                                color: "white",
                            }}
                            onClick={resetToDefaultSettings}
                        >
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};