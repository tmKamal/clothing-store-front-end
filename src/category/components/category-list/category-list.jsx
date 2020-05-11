import React from 'react';
import CategoryItem from '../category-item/category-item';
import './category-list.scss';

const CategoryList=(props)=>{
    return(
        <ul className='categorys-list'>
            {props.items.map((category=><CategoryItem
                key={category.id}
                id={category.id}
                image={category.image}
                name={category.name}
                
            >

            </CategoryItem>))}
        </ul>
    )
}
export default CategoryList;    