import React from "react"
import "./card.css"
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
function Cardlist(props) {
    return (<div className="card" >
        <div className="card-in">
            <div className="card-Title">
                <div className="card-Title-1">
                  <input type="checkbox" checked={props.item.done}
                    onChange={() => props.toggleDone(props.item._id)}
                />
                <h2>{props.item.title}</h2>  
                </div>
                <div className="card-btns">
                    <FaRegEdit
                        onClick={() => {
                            props.setopenEdit(true)
                            props.update(props.item._id)
                        }}
                        style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                    />
                    <MdDeleteForever
                        onClick={() => { props.del(props.id) }}
                        style={{ height: '30px', width: '30px', cursor: 'pointer' }}
                    />
                </div>

            </div>
            <div className="card-des">
                <p>{props.item.body}</p>
            </div>
        </div>
    </div>)
}
export default Cardlist;