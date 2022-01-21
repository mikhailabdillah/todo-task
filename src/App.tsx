import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data.json';
import List from './components/Lists';
import { generateUID } from './lib/generateUID';

type Data = {
  id: string;
  name: string;
  complete: boolean;
}

function App() {
  const [value, setValue] = useState("");
  const [dataStorage, setData] = useState<Array<Data>>(data);

  function dataInput(val: string) {
    const task: Data = {
      id: generateUID(8),
      name: val,
      complete: false
    }
    return setData([...dataStorage, task]);
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    return setValue(event.target.value);
  }

  const handleAddTask = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      
      dataInput(value);
      setValue("");
    }
    return;
  }

  const handleToggleTask = (param: string) => {
    const idx = dataStorage.findIndex((val) => val.id === param);
    const newDataTask = dataStorage.filter((val) => val.id !== param);
    const findTask = dataStorage.find((val) => val.id === param);
    let updateTask = {...findTask} as Data; // Create a new copy object
    updateTask.complete = !findTask?.complete; // Update the object status
    newDataTask.splice(idx, 0, updateTask);
    
    return setData(newDataTask);
  }

  const handleRemoveTask = (param: string) => {
    const newDataTask =  dataStorage.filter((val) => val.id !== param);

    return setData(newDataTask);
  }

  const handleClearStorage = () => {
    window.localStorage.removeItem("task");
    return setData(data);
  }

  useEffect(() => {
    if (typeof(Storage) !== undefined) {
      const store = window?.localStorage?.getItem("task");
      if (store) {
        setData(JSON.parse(store))
      } else {
        window?.localStorage?.setItem("task", JSON.stringify(data));
      }
    } else {
      throw new Error("You browser doesn't support Local Storage");
    }
  }, [])

  useEffect(() => {
    window?.localStorage?.setItem("task", JSON.stringify(dataStorage));
    console.log(window.localStorage.getItem("task"));
  }, [dataStorage]);

  return (
    <div className="App">
      <section className="App-content">
        <input className="App_task_input" type="text" value={value} placeholder="Add task..." onChange={(e) => handleChangeInput(e)} onKeyUp={(e) => handleAddTask(e)} />
        <ul className="App_task_list">
          {dataStorage?.map((task, idx) => {

            return (
              <List id={task.id} complete={task.complete} key={idx} onClick={handleToggleTask} onRemove={handleRemoveTask}>{task.name}</List>
            )
          })}
        </ul>
        <button onClick={handleClearStorage}>Reset</button>
      </section>
    </div>
  );
}

export default App;
