import React from 'react';
import ManagerItem from '../manager-item/manager-item';
import './manager-list.scss';

const ManagerList=(props)=>{
    return(
        <ul className='users-list'>
            {props.items.map((user=><ManagerItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                email={user.email}
                
            >

            </ManagerItem>))}
        </ul>
    )
}
export default ManagerList;    