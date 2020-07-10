import React from 'react';
import Item from "./ExpenseItem";
import { MdDelete } from 'react-icons/md';

const ExpenseList = ({ expenses, handleClear, handleEdit, handleDelete }) => {
    return (
        <>
            <ul className="list">
                {expenses.map((expense) => {
                    return <Item
                        key={expenses.id}
                        expense={expense}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit} />

                })}
            </ul>

            {expenses.length > 0 && <button className="btn" onClick={handleClear}>Clear expenses <MdDelete className="btn-icon" /> </button>}

        </>
    )
}

export default ExpenseList
