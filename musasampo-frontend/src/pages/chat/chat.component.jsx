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

import USERS_DATA from './users.data.js';

import './chat.styles.scss';

class ChatPage extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: 1,
            userName: 'username1',
            users: [],
            channels: ['awesomeChannel'],
            searchField: ''
        };
    }

    /* add all albums from data to array  */
    componentDidMount() {
        this.setState({ users: USERS_DATA });
    }

    /* change search field state to search field input  */
    onSearchChange = event => {
        this.setState({ searchField: event.target.value });
    };

    handleChangeMultiple = (event) => {
        this.setState({
            channels: [
                ...this.state.channels,
                event.target.value
            ]
        })
    }


    render() {
        const { userId, userName, users, searchField, channels } = this.state;

        {/* filter albums and bands with search field value  */ }
        const filteredUsers = users.filter(user =>
            user.username.toLowerCase().includes(searchField.toLowerCase())
        );


        const handleDelete = (chipToDelete) => () => {
            const array = [...this.state.channels]; // make a separate copy of the array
            var index = array.indexOf(chipToDelete)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ channels: [...array] });
            }
        };

        const pubnub = new PubNub({
            publishKey: 'pub-c-ace1075f-a7ff-421a-a32f-ba5059ee6858',
            subscribeKey: 'sub-c-716579b0-2e2f-11eb-9713-12bae088af96',
        });

        return (
            <div>
                <div>{this.state.userName}</div>
                <SearchBox onSearchChange={this.onSearchChange} />
                <FormControl className="form-control">
                    <InputLabel shrink htmlFor="select-multiple-native">
                        Select a user
        </InputLabel>
                    <Select
                        multiple
                        native
                        // value={userName}
                        onChange={this.handleChangeMultiple}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {filteredUsers.map((user) => (
                            <option key={user.userId} value={user.username}>
                                {user.username}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <Paper component="ul" className="paper">
                    {channels.map((channel) => {
                        return (
                            <li key={channels.indexOf(channel)}>
                                <Chip
                                    label={String(channel)}
                                    onDelete={handleDelete(channel)}
                                    className="chip"
                                />
                            </li>
                        );
                    })}
                </Paper>
                <PubNubProvider client={pubnub}>
                    <Chat userName={userName} userId={userId} users={users} channels={channels} />
                </PubNubProvider>
            </div>
        );

    }
}

export default ChatPage;