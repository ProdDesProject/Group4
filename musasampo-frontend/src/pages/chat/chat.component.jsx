import React from 'react';

import ChatBox from '../../components/chat-box/chat-box.component';

import './chat.styles.scss';

class ChatPage extends React.Component {
    constructor() {
        super();

        this.state = {
            userId: 1,
            userName: 'testuser1'
        };
    }


    render() {
        const { userId, userName } = this.state;

        return (
            <div className="root">
                <ChatBox userName={userName} userId={userId} />
            </div>
        );
    }
}

export default ChatPage;