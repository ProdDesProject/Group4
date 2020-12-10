import React, { useCallback, useEffect, useState } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';
import Chat from '../../components/chat/chat.component';
import SearchBox from '../../components/search-box/search-box.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';

import './chat.styles.scss';

import functions from './functions.js'

const ChatPage = () => {

    const user_id = '16';

    const userName = 'username2';

    const [channels, setChannels] = useState([]);
    const [selectedChannels, setSelectedChannels] = useState([]);
    const [searchField, setSearchField] = useState('');

    const getChannels = async () => {
        try {
            const response = await fetch("http://localhost:5000/channels");
            const jsonData = await response.json();
            setChannels(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    const createUserChannels = async (user_id, channel_id) => {
        try {
            const body = { user_id, channel_id };
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

    const getUserChannels = async (user_id) => {
        try {
            const response = await fetch(`http://localhost:5000/userchannels/${user_id}`, {
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

    const deleteUserChannels = async (user_id, channel_id) => {
        try {
            const body = { user_id, channel_id };
            const deleteConnection = await fetch(`http://localhost:5000/userchannels`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            setSelectedChannels(selectedChannels.filter(channel => channel.channel_id !== channel_id));
        } catch (err) {
            console.error(err.message);
        }
    };


    useEffect(() => {
        getChannels();
        getUserChannels(user_id);

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
        createUserChannels(user_id, channel[0].channel_id)

        setSelectedChannels([...selectedChannels, channel[0]])
    }

    {/* filter albums and bands with search field value  */ }
    const filteredChannels = channels.filter(channel =>
        channel.channelname.toLowerCase().includes(searchField.toLowerCase())
    );

    const handleDelete = (chipToDelete) => () => {

        const channel_id = chipToDelete.channel_id;
        deleteUserChannels(user_id, channel_id)

        /*         const array = selectedChannels; // make a separate copy of the array
                var index = array.indexOf(chipToDelete)
                if (index !== -1) {
                    array.splice(index, 1);
                    setSelectedChannels([...array]);
                } */
    };

    const pubnub = new PubNub({
        publishKey: 'pub-c-ace1075f-a7ff-421a-a32f-ba5059ee6858',
        subscribeKey: 'sub-c-716579b0-2e2f-11eb-9713-12bae088af96',
    });

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
                            <option key={channel.channel_id} value={channel.channelname}>
                                {channel.channelname}
                            </option>
                        ))
                    }
                </Select>
            </FormControl>
            <Paper component="ul" className="paper">
                {selectedChannels.map((channel) => {
                    return (
                        <li key={channel.channel_id}>
                            <Chip
                                label={channel.channelname}
                                onDelete={handleDelete(channel)}
                                className="chip"
                            />
                        </li>
                    );
                })}
            </Paper>
            <PubNubProvider client={pubnub}>
                <Chat userName={userName} user_id={user_id} channels={channels} />
            </PubNubProvider>
        </div >
    );


}

export default ChatPage;