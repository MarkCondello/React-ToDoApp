import React from 'react'

class Form extends React.Component {
    constructor(props) {
        super();
        this.state = {
            selectDefaultValue: 'low',
        }
    }
    
    getTodaysDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        return `${year}-${month}-${day}`;
    }

    resetForm = () => {
        this.toDoDescRef.value = '';
        this.toDoByRef.value = 'yyyy-MM-dd';
        this.toDoPriorityRef.value = this.state.selectDefaultValue;
        this.toDoDescRef.focus();
    }

    validateForm = () => {
        if(this.toDoDescRef.value === ''){
            alert("Add a description.");
            return false;
        }

        let currentDate = this.getTodaysDate();
         if(this.toDoByRef.value < currentDate && this.toDoByRef.value !== ''){
            alert(`The date ${this.toDoByRef.value} is a past date.`);
            return false;
        } 
        return true;
    }

    handleSubmit = (ev) => {
        ev.preventDefault();
        let validation = this.validateForm();
        if(validation){
            let toDoItem = {
                description: this.toDoDescRef.value,
                priority: this.toDoPriorityRef.value,
                completeBy: this.toDoByRef.value,
                dateCreated: this.getTodaysDate(),
                completed: false,
                overdue: false
            }
            this.props.addToDoItem(toDoItem);
            this.resetForm();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>  
                    <label htmlFor="toDoDesc">Description:</label>
                    <textarea id="toDoDesc" ref={desc =>{ this.toDoDescRef = desc} } required></textarea>
                </p>
                <p>
                <label htmlFor="toDoPriority">Priority:</label>
                <select id="toDoPriority" name="toDoPriority" ref={priority =>{ this.toDoPriorityRef = priority} }>
                    <option value="low">Low</option>
                    <option value="med">Medium</option>
                    <option value="high">High</option>
                </select>
                </p>  
                <p>
                    <label htmlFor="toDoBy" >Date to complete by:</label>
                    <input type="date" id="toDoBy" min={this.getTodaysDate()} ref={doBy =>{ this.toDoByRef = doBy} }/>
                </p>
                <p>
                    <button onClick={this.handleSubmit}>Add to do</button>
                </p>
            </form>
        )
    }
}

export default Form;