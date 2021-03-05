import React from 'react'
import { Form } from 'react-bootstrap'

const MessageBox = (props) => {

    return (
        <div>
            < Form >
                < textarea onChange={(e) => {props.handleChange(e)}} >{props.writeMessage}</textarea>
                < input type='submit' onClick={(e) => {props.handleSubmit(e)}} />
            </Form>
        </div>
    )
}

export default MessageBox