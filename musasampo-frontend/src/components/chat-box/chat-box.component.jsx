import React, { useCallback, useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

import './chat-box.styles.scss'

const pubnub = new PubNub({
    publishKey: 'pub-c-ace1075f-a7ff-421a-a32f-ba5059ee6858',
    subscribeKey: 'sub-c-716579b0-2e2f-11eb-9713-12bae088af96',
});


const channels = ['awesomeChannel'];

const Chat = (props) => {
    const pubnub = usePubNub();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const userName = props.userName;

    useEffect(() => {
        pubnub.addListener({
            message: messageEvent => {
                setMessages([...messages, messageEvent.message]);
            },
        });

        pubnub.subscribe({ channels });
    }, [messages]);

    const sendMessage = useCallback(
        async message => {
            await pubnub.publish({
                channel: channels[0],
                message: {
                    userName,
                    message,
                }
            });

            setInput('');
        },
        [pubnub, setInput]
    );

    return (
        <div className="chat">
            <div className="chat-header">React Chat Example</div>
            <div className="chat-window" >
                {messages.map((message, messageIndex) => {
                    return (
                        <div className="inner-chat-window"
                            key={`message-${messageIndex}`} >

                            <div className="username">
                                {message.userName + ": "}
                            </div>

                            <div className="message" >
                                {message.message}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="chat-footer" >
                <input className="input"
                    type="text"
                    placeholder="Type your message"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            sendMessage(input);
                        }
                    }
                    }
                />
                <button className="send"
                    onClick={e => {
                        e.preventDefault();
                        sendMessage(input);
                    }}                >
                    Send Message
            </button>
            </div>
        </div>
    );
};

const ChatBox = (props) => {
    return (
        <div className="wrapper">
            <PubNubProvider client={pubnub}>
                <Chat userName={props.userName} />
            </PubNubProvider>
        </div>
    );
};

export default ChatBox;
