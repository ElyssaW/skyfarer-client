import React from 'react'
import { Form } from 'react-bootstrap'

const MessageBox = (props) => {

    return (
        <div>
            < Form >
                < Form.Control type='text' onChange={(e) => {props.handleChange(e)}} value={props.writeMessage} />
                < button onClick={(e) => {props.handleSubmit(e)}}>
                    Send Message
                </button>
            </Form>
        </div>
    )
}

export default MessageBox