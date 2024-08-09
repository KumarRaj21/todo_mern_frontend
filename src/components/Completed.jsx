import React from 'react'
import Cardlist from './Listcards'
import './card.css'
import './All/All.css'
function Completed(props){
    const completedTasks = props.tasklist ? props.tasklist.filter(task => task.done) : [];
    return(
        <div className='cardlist'>
            <h2 style={{marginBottom:"10px"}}>Completed Tasks</h2>
            {completedTasks.length !==0 ? 
                completedTasks.map((item,index)=>{
                    return <Cardlist openEdit={props.openEdit} setopenEdit={props.setopenEdit} item={item} key ={index}  id={item._id}
                    del={props.del}
                    updateId ={index}
                    update={props.update}
                    index={index}
                    updateArray={props.updatedArray}
                    toggleDone ={props.toggleDone}/>
                })    
        :<h2>No Tasks are Marked as Complete</h2>}
            
        </div>
    )
}
export default Completed