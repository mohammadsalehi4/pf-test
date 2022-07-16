import React from 'react'

const AutoLogin = (props) => {
    const MYusername=props.match.params.username
    const MYcode=props.match.params.code
    return (
        <div>{MYcode}</div>
    )
}

export default AutoLogin