import { useState, useEffect } from 'react';


function Homepage() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: itemText })
      });
      const data = await res.json();
      setListItems(prev => [...prev, data]);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/items');
        // method :"GET"
        const data = await res.json();
        setListItems(data);
     //   console.log('render');
      } catch (err) {
    //    console.log(err);
      }
    }
    getItemsList();
  }, []);

  const deleteItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/item/${id}`, {
        method: 'DELETE'
      });
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  }

  const updateItem = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/item/${isUpdating}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: updateItemText })
      });
      const data = await res.json();
      console.log(data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
  }

  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e) => { updateItem(e) }}>
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )

  return (
    <div className="home">
      <h1>Todo List</h1>
      <form className="form" onSubmit={e => addItem(e)}>
        <input type="text" placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        {
          listItems.map(item => (
            <div className="todo-item" key={item._id}>
              {
                isUpdating === item._id
                  ? renderUpdateForm()
                  : <>
                    <p className="item-content">{item.item}</p>
                    <button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                    <button className="delete-item" onClick={() => { deleteItem(item._id) }}>Delete</button>
                  </>
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Homepage;
