import { useState } from "react";

export default function Form({onAddingItem}) {
    const [description, setDescription] = useState("Place an item...");
    const [quantity, setQuantity] = useState(1);
  
    function handleSubmit(e) {
      e.preventDefault();
      const newItem = {
        id: Date.now(),
        //*
        description,
        quantity,
        packed: false,
      };
  
      setQuantity(1);
      setDescription("Place an item...");
      onAddingItem(newItem);
    }
  
    return (
      <div className="add-form">
        <form onSubmit={handleSubmit}>
          <h3>What do you need for your trip ❤</h3>
          <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
            {Array.from({length: 20}, (_, i) => i + 1)
                  .map((num) => <option key={num}>{num}</option>)}
          </select>
          <input onChange={(e) => setDescription(e.target.value)} value={description} />
          <button className="submit">Add</button>
        </form>
        
      </div>
    );
}