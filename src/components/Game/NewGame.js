import React from 'react'
import { Form, Col } from 'react-bootstrap'

const NewGame = () => {

    return (
        <div className='container'>
            < Form >
                < Form.Label >Game Title</Form.Label>
                < Form.Control ></Form.Control>

                < Form.Label >Description</Form.Label>
                < Form.Control ></Form.Control>

                < Form.Label >Add tags</Form.Label>
                < Form.Control ></Form.Control>
                
                < Form.Label >Add users</Form.Label>
                < Form.Control ></Form.Control>

                < input type='submit' />
            </Form>
        </div>
    )
}

export default NewGame