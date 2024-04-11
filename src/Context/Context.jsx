import { createContext, useState } from 'react';
import runChat from '../config/gemini';

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData((prev) => prev + nextWord);
        }, 75 * index);
    };

    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await runChat(prompt);
            setRecentPrompt(prompt);
        } else {
            setPreviousPrompt((prev) => [...prev, input]);
            setRecentPrompt(input);
            response = await runChat(input);
        }

        let responseArray = response.split('**');
        console.log(responseArray.length);
        let newResponse = '';
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 == 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += '<b>' + responseArray[i] + '</b>';
            }
        }

        let newResponse2 = newResponse.split('*').join('</br>');
        let newResponseArray = newResponse.split(' ');
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + ' ');
        }

        setResultData(newResponse2);
        setLoading(false);
        setInput('');
    };

    // onSent('What is next js?');
    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    };
    return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
