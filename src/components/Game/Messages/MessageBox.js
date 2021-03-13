import React from 'react'
import { Form } from 'react-bootstrap'

const MessageBox = (props) => {

    return (
        <div>
            < Form >
                { !props.editMessage ? (
                    <>
                    < Form.Control type='text' onChange={(e) => {props.handleChange(e)}} value={props.newMessage} />
                    < button className='button' onClick={(e) => {props.handleSubmit(e)}}>
                        Send Message
                    </button>
                    </>
                ) : (
                    <>
                    < Form.Control type='text' onChange={(e) => {props.handleChange(e)}} value={props.newMessage} />
                    < button className='button' onClick={(e) => {props.handleSubmitEdit(e)}}>
                        Save Edited Message
                    </button>
                    < button className='button' onClick={(e) => {props.cancelEdit(e)}}>
                        Cancel
                    </button>
                    </>
                )}
            </Form>
        </div>
    )
}

export default MessageBox