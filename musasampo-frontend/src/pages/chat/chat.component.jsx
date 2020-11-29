import React from 'react';

import ChatBox from '../../components/chat-box/chat-box.component';

import './chat.styles.scss';

class ChatPage extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: 1,
            userName: 'Jonas'
        };
    }


    render() {
        const { userId, userName } = this.state;

        return (
            <ChatBox userName={userName} userId={userId} />
        );
    }
}

export default ChatPage;