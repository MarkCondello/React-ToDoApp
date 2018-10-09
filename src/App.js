import React, { Component } from 'react';
import Form from './Form';
import ToDoItem from './ToDoItem';
import Data from './data/toDoData.json'
 
class App extends Component {
  constructor () {
    super();
    this.state = {
      toDoItems: {},
    }
  }

  componentDidMount() {
    this.setState({toDoItems : {...Data}});

  }

  addToDoItem = (item) => {
    let toDos = this.state.toDoItems;
    let itemNumber =  Object.keys(this.state.toDoItems).length;

    toDos[`toDo_${itemNumber}`] = item; // update the named properrty for the object from a has h to a numeric value
    this.setState({toDoItems : toDos});

    //console.log("From APP: ", this.state.toDoItems)
  }

  updateCompleted = (index => {
    const newToDoItems = {...this.state.toDoItems};
    let completedVal = newToDoItems[`toDo_${index}`].completed;
    newToDoItems[`toDo_${index}`].completed = !completedVal;
    console.log(newToDoItems[`toDo_${index}`].completed );
    this.setState({toDoItems : newToDoItems});

   })

  render() {
    return (
      <div className="App">
        <h1>To Do App</h1>
        <Form toDoLength={this.state.toDoItems} addToDoItem={this.addToDoItem}/>
        <ul className="toDoListItemContainer">
       
          {Object.keys(this.state.toDoItems).map((item, index) => {
            return <ToDoItem key={index} index={index} details={this.state.toDoItems[item]} updateCompleted={this.updateCompleted}/>
          })}
        </ul>
      </div>
    );
  }
}

export default App;
