import React from 'react'

export default ({ username, channelname, message }) =>
    <p>
        <strong>{username} in {channelname} </strong> <em>{message}</em>
    </p>