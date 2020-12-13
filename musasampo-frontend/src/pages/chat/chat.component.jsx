import React, { useCallback, useEffect, useState } from 'react';
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

const URL = 'ws://localhost:3030';

const ChatPage = () => {

    const ws = new WebSocket(URL)

    const userName = 'username2';

    const [channels, setChannels] = useState([]);
    const [selectedChannels, setSelectedChannels] = useState([]);
    const [searchField, setSearchField] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedChannel, setSelectedChannel] = useState('');

    const handleChange = (event) => {
        setSelectedChannel(event.target.value);
    };

    const getChannels = async () => {
        try {
            const response = await fetch("http://localhost:5000/channels");
            const jsonData = await response.json();
            setChannels(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const createUserChannels = async (username, channelname) => {
        try {
            const body = { username, channelname };
            const response = await fetch("http://localhost:5000/userchannels", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log("User channel connection created: " + JSON.stringify(jsonData));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUserByUsername = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/users/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            // DO SOMETHING
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUserChannels = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/userchannels/${username}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            setSelectedChannels(jsonData);
            console.log(jsonData)
        } catch (err) {
            console.error(err.message);
        }
    };

    //delete function

    const deleteUserChannels = async (username, channelname) => {
        try {
            const body = { username, channelname };
            const deleteConnection = await fetch(`http://localhost:5000/userchannels`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            setSelectedChannels(selectedChannels.filter(channel => channel.channelname !== channelname));
        } catch (err) {
            console.error(err.message);
        }
    };

    const createMessage = async (message) => {
        try {
            const body = message;
            console.log(JSON.stringify(body));
            const response = await fetch("http://localhost:5000/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const jsonData = await response.json();
            console.log("Message added: " + JSON.stringify(jsonData));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getMessages = async (channelname) => {
        try {
            const response = await fetch(`http://localhost:5000/messages/${channelname}`, {
                method: "GET"
            });
            const jsonData = await response.json();
            console.log(jsonData)
            setMessages(jsonData);


            console.log(messages)
        } catch (err) {
            console.error(err.message);
        }
    };


    const addMessage = message => {
        setMessages(messages => [message, ...messages])
    }


    const submitMessage = (messageString, selectedChannel) => {
        // on submitting the ChatInput form, send the message, add it to the list and reset the input
        const message = { message_id: uuidv4(), messagecontent: messageString, username: userName, channelname: selectedChannel }
        createMessage(message)
        ws.send(JSON.stringify(message))

    }

    useEffect(() => {
        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
        }

        ws.onmessage = evt => {
            // on receiving a message, add it to the list of messages
            const message = JSON.parse(evt.data)
            setMessages(messages => [...messages, message])
            //addMessage(message)
            console.log('already added')

        }

        ws.onclose = () => {
            console.log('disconnected')
            // automatically try to reconnect on connection loss
            // setState({
            //ws: new WebSocket(URL),
            // })
        }
        getMessages(userName)
        getChannels();
        getUserChannels(userName);
        functions.getUserByUsername(userName);
    }, []);

    /* change search field state to search field input  */
    const onSearchChange = event => {
        setSearchField(event.target.value);
    };

    const handleChangeMultiple = (event) => {
        const channel = channels.filter(channel =>
            channel.channelname.toLowerCase().includes(event.target.value.toLowerCase())
        );
        createUserChannels(userName, channel[0].channelname)

        setSelectedChannels([...selectedChannels, channel[0]])
    }

    {/* filter albums and bands with search field value  */ }
    const filteredChannels = channels.filter(channel =>
        channel.channelname.toLowerCase().includes(searchField.toLowerCase())
    );

    const handleDelete = (chipToDelete) => () => {

        const channelname = chipToDelete.channelname;
        deleteUserChannels(userName, channelname)
    };


    return (
        <div>
            <div>{userName}</div>
            <SearchBox onSearchChange={onSearchChange} />
            <FormControl className="form-control">
                <InputLabel shrink htmlFor="select-multiple-native">
                    Select a Channel
        </InputLabel>
                <Select
                    multiple
                    native
                    // value={userName}
                    onChange={handleChangeMultiple}
                    inputProps={{
                        id: 'select-multiple-native',
                    }}
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
            <div>
                <label htmlFor="name">
                    Name: userName;
            </label>
                <Chat
                    ws={ws}
                    onSubmitMessage={messageString => submitMessage(messageString, selectedChannel)}
                />

                <FormControl variant="outlined" className="select" >
                    <InputLabel htmlFor="outlined-age-native-simple">Channel</InputLabel>
                    <Select
                        native
                        value={selectedChannel}
                        onChange={handleChange}
                        label="Channel"
                        inputProps={{
                            name: 'channelname',
                        }}
                    >
                        <option aria-label="None" value="" />
                        {selectedChannels.map(channel => <option value={channel.channelname}>{channel.channelname}</option>)

                        }

                    </Select>
                </FormControl>

                {messages.map((message, index) =>
                    <ChatMessage
                        key={index}
                        message={message.messagecontent}
                        username={message.username}
                        channelname={message.channelname}
                    />,
                )}
            </div>
        </div >
    );


}

export default ChatPage;