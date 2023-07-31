import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddingItem(newItem) {
    setItems((items)=> [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    //naive approach
    // const updatedItems = [...items];
    // const updatedItemIndex = [...items].findIndex(item => item.id === id);
    // updatedItems[updatedItemIndex].packed = !updatedItems[updatedItemIndex].packed;
    // setItems(updatedItems);

    //better approach
    setItems((items) => items.map(item => item.id === id ? {...item, packed: ! item.packed} : item ));
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddingItem={handleAddingItem}/>
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem} onClearItems={handleClearItems}/>
      <Stats />
    </div>
  );
}

function PackingList({items, onDeleteItem, onUpdateItem, onClearItems}) {
  const [sortBy, setSortBy] = useState('input');

  let sortItems;

  if(sortBy === 'input') sortItems = items;
  if (sortBy === 'description') sortItems = [...items].sort((a,b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed') sortItems = [...items].sort((a,b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortItems.map((item) => (
          <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />
        ))}
      </ul>

      <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="description">Sort by description</option>
            <option value="input">Sort by input order</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button onClick={onClearItems}>Clearing the list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onUpdateItem }) {
  return (
      <li>
        <input type="checkbox" value={item.packed} onClick={() => onUpdateItem(item.id)}/>
        <span style={{textDecoration: item.packed ? 'line-through' : ''}}>
          {item.quantity} {item.description} 
        </span>
        <button onClick={()=> onDeleteItem(item.id)}>❌</button>
      </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
