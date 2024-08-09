import React from 'react'
import './All.css'
import Cardlist from "../Listcards"
function All(props) {
    return (Array.isArray(props.tasklist) && props.tasklist.length !== 0) ? (
        <>

            <div className="home-container">
                <div className="removeall">
                    <button onClick={() => {
                        props.settrigger(!props.trigger);
                    }} style={{ cursor: 'pointer' }}>+ Add Task</button>
                </div>
                <div className="cardlist">
                    {
                        props.tasklist.map((item, index) => {
                            return (<Cardlist openEdit={props.openEdit} setopenEdit={props.setopenEdit} item={item} key={index} id={item._id}
                                del={props.del}
                                updateId={index}
                                update={props.update}
                                index={index}
                                updateArray={props.updatedArray}
                                toggleDone={props.toggleDone}
                            />)
                        })
                    }
                </div>
            </div>
        </>) : <div className='home-empty'>
        <h1>Do Not Have any Tasks Add your Tasks </h1>
        <button onClick={() => {
            props.settrigger(!props.trigger);
        }} style={{ cursor: 'pointer' }}>
            + Add Task
        </button>
    </div>;
}

export default All