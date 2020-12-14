
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './chat.styles.scss'

class Chat extends Component {
    static propTypes = {
        onSubmitMessage: PropTypes.func.isRequired,
    }
    state = {
        message: '',
    }



    render() {
        return (


            <form
                action="."
                onSubmit={e => {
                    e.preventDefault()
                    this.props.onSubmitMessage(this.state.message)
                    this.setState({ message: '' })
                }}
            >

                <input className="input-field"
                    type="text"
                    placeholder={'Enter message...'}
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />

                <input className="send-button" type="submit" value={'Send'} />
            </form>
        )
    }
}

export default Chat;
