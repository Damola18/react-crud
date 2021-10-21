import React, {useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useHistory } from 'react-router';
require('dotenv').config();

export default function Update(){
    let history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [checkbox, setCheckbox] = useState('');
    const [id, setID] = useState(null);

    const mockAPIkey = process.env.MOCK_API_KEY
    console.log(mockAPIkey);

    

    useEffect(() => {
        setID(localStorage.getItem('ID'))
        setFirstName(localStorage.getItem('First Name'))
        setLastName(localStorage.getItem('Last Name'));
        setCheckbox(localStorage.getItem("Checkbox Value"))
    }, []);

    const updateAPIData = () => {
        axios.put(`${process.env.REACT_APP_MOCK_API_KEY}/${id}`, {
            firstName,
            lastName,
            checkbox
        }).then(() =>{
            history.push('/read')
        })
    }

    return(
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Field>

                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={lastName} 
                    onChange={(e) => setLastName(e.target.value)}/>
                </Form.Field>

                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' 
                    checked={checkbox} onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                
                <Button type="submit" onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
        
    )
}