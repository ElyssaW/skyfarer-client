import React from 'react'
import { Container, Form, Col } from 'react-bootstrap'

const WriteCharacter = () => {

    return (
        < Container >
            < Form >
                < Form.Group >
                    < Form.Label for='name' >I am...</Form.Label>
                    < Form.Control type='text' name='name' />
                </ Form.Group >

            <Form.Group>
                < Form.Row >
                    < Col >
                        < Form.Label for='trait1' >Who is... </Form.Label>
                        < Form.Control type='text' name='trait1' />
                    </Col>

                    < Col >
                        < Form.Label for='trait2' > and </Form.Label>
                        < Form.Control type='text' name='trait2' />
                    </Col>
                </Form.Row>
            </Form.Group>

            <Form.Group>
                    < Form.Label for='profession' >My role on this ship is...</Form.Label>
                    < Form.Control type='text' name='profession' />
            </Form.Group>

            <Form.Group>
                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' for='irons' >Irons</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' inline label='-1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-2' inline label='0' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-3' inline label='1' type='radio' name='irons' />
                    < Form.Check className='new-character-stat-column stat-col-4' inline label='2' type='radio' name='irons' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' for='hearts' >Hearts</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' inline label='-1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-2' inline label='0' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-3' inline label='1' type='radio' name='hearts' />
                    < Form.Check className='new-character-stat-column stat-col-4' inline label='2' type='radio' name='hearts' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' for='veils' >Veils</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' inline label='-1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-2' inline label='0' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-3' inline label='1' type='radio' name='veils' />
                    < Form.Check className='new-character-stat-column stat-col-4' inline label='2' type='radio' name='veils' />
                </Form.Row>

                < Form.Row className='new-character-stat-row' >
                    < Form.Label className='col-1' for='mirrors' >Mirrors</Form.Label>
                    < Form.Check className='new-character-stat-column stat-col-1' inline label='-1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-2' inline label='0' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-3' inline label='1' type='radio' name='mirrors' />
                    < Form.Check className='new-character-stat-column stat-col-4' inline label='2' type='radio' name='mirrors' />
                </Form.Row>
            </Form.Group>

            <Form.Row>
                < Col >
                    < Form.Label for='integretity-1' >I love...</Form.Label>
                    < Form.Control type='number' name='integretity-1' />
                </Col>

                < Col >
                    < Form.Label for='integretity-2' >I hate...</Form.Label>
                    < Form.Control type='number' name='integretity-2' />
                </Col>
            </Form.Row>

            <Form.Row>
                < Col >
                    < Form.Label for='integretity-3' >I will always...</Form.Label>
                    < Form.Control type='number' name='integretity-3' />
                </Col>

                < Col >
                    < Form.Label for='integretity-4' >I will never...</Form.Label>
                    < Form.Control type='number' name='integretity-4' />
                </Col>
            </Form.Row>

            < Form.Row >
                < Form.Label for='integretity-4' >Anything else people should know... (Other players can see this!)</Form.Label>
                < Form.Control type='number' name='integretity-4' />
            </Form.Row>

            < Form.Row >
                < Form.Label for='integretity-4' >Hidden Notes (Only you and your GM can see this)</Form.Label>
                < Form.Control type='number' name='integretity-4' />
            </Form.Row>

            < input type='submit' />
            </ Form >
        </ Container >
    )
}

export default WriteCharacter