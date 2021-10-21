import React, {useEffect, useState } from 'react';
import { Table , Button} from 'semantic-ui-react'
import axios from 'axios';
import { Link} from 'react-router-dom';

require('dotenv').config();


export default function Read(){
    const [APIData, setAPIData ] = useState([]);
    console.log(process.env);
    console.log(process.env.REACT_APP_MOCK_API_KEY);
    
    useEffect( () => {
        axios.get(`${process.env.REACT_APP_MOCK_API_KEY}`)
            .then((response) =>{
                setAPIData(response.data)
                
            })
    }, [])

    const setData = (data) => {
        let { id, firstName, lastName, checkbox } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('First Name', firstName);
        localStorage.setItem('Last Name', lastName);
        localStorage.setItem('Checkbox Value', checkbox);
    }
    
    const onDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_MOCK_API_KEY}/${id}`)
        .then(() => {
            getData();
        })
    }

    const getData = () =>{
        axios.get(`${process.env.REACT_APP_MOCK_API_KEY}`)
            .then((getData) =>{
                setAPIData(getData.data)
            })
    }
    return(
        <div>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Checked</Table.HeaderCell>
                        <Table.HeaderCell>Update</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                        
                    </Table.Row>   
                </Table.Header>

                <Table.Body>
                    {APIData.map((data) => {
                        return (
                            <Table.Row>
                                <Table.Cell> {data.firstName} </Table.Cell>
                                <Table.Cell> {data.lastName} </Table.Cell>
                                <Table.Cell> {data.checkbox ? 'Yes' : 'No'} </Table.Cell>
                                
                                <Link to="/update">
                                    <Table.Cell>
                                            <Button onClick={() => setData(data)}> Update </Button>
                                    </Table.Cell>
                                </Link>
                                

                                <Table.Cell className="btn">
                                        <Button onClick={() => onDelete(data.id)} style={{color:"white", background:"rgba(255,0,0,0.7)"}}>Delete</Button>
                                </Table.Cell>

                            </Table.Row>
                        )
                    })}    
                </Table.Body>

            </Table>
        </div>    
    )
}