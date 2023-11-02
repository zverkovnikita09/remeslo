import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: unknown) => {
    if (!window.localStorage) {
        throw new Error("Local storage недоступен");
    }

    const [value, setValue] = useState(getValue(key, initialValue));

    function getValue(key: string, value: unknown) {
        const storageValue = localStorage.getItem(key);

        if (!storageValue) {
            localStorage.setItem(key,  JSON.stringify(value));

            return value;
        }

        return JSON.parse(storageValue);
    }

    function onValueChange(value: unknown) {
        setValue(value);
        localStorage.setItem(key,  JSON.stringify(value))
    }

    return [value, onValueChange];
}