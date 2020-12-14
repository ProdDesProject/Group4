import React, { useCallback, useEffect, useState, useRef } from 'react';
import Chat from '../../components/chat/chat.component';
import ChatMessage from '../../components/chat-message/chat-message.component';
import SearchBox from '../../components/search-box/search-box.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { v4 as uuidv4 } from 'uuid';

import './chat.styles.scss';

import functions from './functions.js'

// address of the websocket
const URL = 'ws://193.196.53.33:3030';

const ChatPage = () => {

    const ws = new WebSocket(URL)

    const userName = 'username2';

    const [channels, setChannels] = useState([]);
    const [selectedChannels, setSelectedChannels] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');



    // get all channels

    const getChannels = async () => {
        try {
            const response = await fetch("http://193.196.53.33:3000/channels");
            const jsonData = await response.json();
            setChannels(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    // get channels by username

    const getUserChannels = async (username) => {
        try {
            const response = await fetch(`http://193.196.53.33:3000/userchannels/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            setSelectedChannels(jsonData);
            setSelectedChannel(jsonData[0].channelname)
        } catch (err) {
            console.error(err.message);
        }
    };

    // delete user-channel connection

    const deleteUserChannels = async (username, channelname) => {
        try {
            const body = { username, channelname };
            const deleteConnection = await fetch(`http://193.196.53.33:3000/userchannels`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            setSelectedChannels(selectedChannels.filter(channel => channel.channelname !== channelname));
        } catch (err) {
            console.error(err.message);
        }
    };

    // get all messages by channel

    const getMessages = async (channelname) => {
        try {
            const response = await fetch(`http://193.196.53.33:3000/messages/${channelname}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            setMessages(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleChange = (event) => {
        setSelectedChannel(event.target.value);
    };

    const submitMessage = (messageString, selectedChannel) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { message_id: uuidv4(), messagecontent: messageString, username: userName, channelname: selectedChannel }
        functions.createMessage(message)
        ws.send(JSON.stringify(message))

    }

    // functionality to always scroll to the bottom of the chat if message comes in

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    //

    useEffect(() => {


        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            setMessages(messages => [...messages, message])

        }

        ws.onclose = () => {
            console.log('disconnected')
        }
        getMessages(userName)
        getChannels();
        getUserChannels(userName);
        functions.getUserByUsername(userName);

    }, []);

    // change search field state to search field input 
    const onSearchChange = event => {
        setSearchField(event.target.value);
    };


    // add user-channel connections
    const handleChangeMultiple = (event) => {
        const channel = channels.filter(channel =>
            channel.channelname.toLowerCase().includes(event.target.value.toLowerCase())
        );
        functions.createUserChannels(userName, channel[0].channelname)

        setSelectedChannels([...selectedChannels, channel[0]])
    }

    {/* filter albums and bands with search field value  */ }
    const filteredChannels = channels.filter(channel =>
        channel.channelname.toLowerCase().includes(searchField.toLowerCase())
    );

    // delete user-channel connections

    const handleDelete = (chipToDelete) => () => {
        const channelname = chipToDelete.channelname;
        deleteUserChannels(userName, channelname)
    };


    return (
        <div>

            <div class="navigation">

                {/* left side */}
                <li>

                    <div className="left-side">

                        <h2>Chat with other Musasampo Users!</h2>

                        <div className="search">
                            1. Find your favorite channels with the search
                            <SearchBox onSearchChange={onSearchChange} />
                        </div>

                        <div className="subscribe">
                            2. Subscribe to your favorite channels
                        <FormControl className="form-control">
                                <InputLabel shrink htmlFor="select-multiple-native">
                                    Select a Channel
</InputLabel>
                                <Select
                                    multiple
                                    native
                                    // value={userName}
                                    onChange={handleChangeMultiple}
                                >
                                    {
                                        filteredChannels.map((channel) => (
                                            <option key={channel.channelname} value={channel.channelname}>
                                                {channel.channelname}
                                            </option>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>

                        <div className="subscriptions">
                            3. See the list of the subscribed channels where you are getting messages from!
                        <Paper component="ul" className="paper">

                                {selectedChannels.map((channel) => {
                                    return (
                                        <li key={channel.channelname}>
                                            <Chip
                                                label={channel.channelname}
                                                onDelete={handleDelete(channel)}
                                                className="chip"
                                            />
                                        </li>
                                    );
                                })}
                            </Paper>
                        </div>

                    </div>

                </li>


                {/* right side */}
                <li>

                    <div className="username">
                        Your Username: {userName}
                    </div>

                    <div className="messages" id="messages">
                        {messages.map((message, index) =>
                            <ChatMessage
                                key={index}
                                message={message.messagecontent}
                                username={message.username}
                                channelname={message.channelname}
                            />,
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="send-bar">
                        <FormControl variant="outlined" className="select-wrapper" >
                            <Select
                                className="select"
                                native
                                value={selectedChannel}
                                onChange={handleChange}
                            >
                                {selectedChannels.map(channel => <option value={channel.channelname}>{channel.channelname}</option>)}

                            </Select>
                        </FormControl>

                        <Chat
                            ws={ws}
                            onSubmitMessage={messageString => submitMessage(messageString, selectedChannel)}
                        />
                    </div>


                </li>

            </div>





        </div >
    );


}

export default ChatPage;