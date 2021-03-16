import React from 'react'
import { Form } from 'react-bootstrap'

const MessageBox = (props) => {

    return (
        <div>
            < Form className='message-form' >
                { !props.editMessage ? (
                    <>
                    < Form.Control type='textarea' className='send-box' onChange={(e) => {props.handleChange(e)}} value={props.newMessage} />
                    < button className='button send-button' onClick={(e) => {props.handleSubmit(e)}}>
                        Send
                    </button>
                    </>
                ) : (
                    <>
                    < Form.Control type='textarea' onChange={(e) => {props.handleChange(e)}} value={props.newMessage} />
                    < button className='button' onClick={(e) => {props.handleSubmitEdit(e)}}>
                        Save Edits
                    </button>
                    < button className='button' onClick={(e) => {props.cancelEdit(e)}}>
                        Cancel Edits
                    </button>
                    </>
                )}
            </Form>
        </div>
    )
}

export default MessageBox