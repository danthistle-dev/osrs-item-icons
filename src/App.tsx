import React from "react";
import { useItems } from "./hooks/useItems"
import Item from "./components/item"

function App() {
  const { items, isLoading, isError } = useItems(1, 25)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>
  return (
    <div className="App">
      {items._items.map((item: { icon: string; name: string; }) => (
        <Item icon={item.icon} name={item.name} />
      ))}
    </div>
  );
}

export default App;
