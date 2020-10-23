import React from 'react';

class ToDoItem extends React.Component {
    constructor(props) {
        super();
    }

    getDueBy = (completeBy, dateCreated) =>{
        if(completeBy){
            let completeByConverted = new Date(completeBy);
            let dateCreatedConverted = new Date(dateCreated);
            let oneDayMSValue = 1000*60*60*24;
            let daysBetween = (completeByConverted - dateCreatedConverted) / oneDayMSValue;
             return daysBetween; 
        } else {
            return null;
        }
    }

    daysTilFormatted = (dueBy) => {
        if (dueBy > 1) {
            return `Due in ${dueBy} days`;
        } 
        else if (dueBy === 1) {
            return `Due in ${dueBy} day`;
        } else {
            return `Due today`;
        } 
    }

    upperCaseFirstLetter = (word) => {
        return word[0].toUpperCase() + word.slice(1, word.length );
    }

    handleRadioChange = (ev) => {
        this.props.updateCompleted(this.props.index);
    }

    render() {
        const { description, priority, completeBy, dateCreated, completed} = this.props.details;
        let dueBy = this.getDueBy(completeBy, dateCreated);
          return (
            <li className='toDoItemContainer'>
             { (completeBy && !completed) && <span className='toDoItemDueBy'>{this.daysTilFormatted(dueBy)}</span> }

                <div className={completed ? `toDoItemCompleted` : `toDoItem${this.upperCaseFirstLetter(priority)}Priority`}>  
                    <div className={`priorityContainer ${priority}`}>
                        <h2>{priority}</h2>
                    </div>
                    <p><strong>Details:&nbsp;</strong> { description }</p>
                    
                    <div className="toDoItemControlsContainer">
                        <div className='toDoItemControlsContainerCompleted'><strong>Completed:&nbsp;</strong>
                            <span>yes<input 
                                type="radio"
                                name={`completedToDoRadio_${this.props.index}`} 
                                value="true" 
                                checked = {completed === true}
                                onChange={this.handleRadioChange} 
                                ref = {radioItem1 => this.completedRadio = radioItem1} />
                            </span>
                            <span>no<input 
                                type="radio"
                                name={`completedToDoRadio_${this.props.index}`}
                                value="false" 
                                checked = {completed === false}
                                onChange={this.handleRadioChange} 

                                ref = {radioItem2 => this.incompleteRadio = radioItem2} />
                            </span>
                        </div> 
                        <div className="toDoItemControlsContainerButtons">
                            <button type="button" value="edit">edit</button>
                            <button type="button" value="delete">delete</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

export default ToDoItem;
