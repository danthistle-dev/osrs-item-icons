import React, { useState } from "react"
import { useItems } from "../../hooks/useItems"
import Item from "../item"
import Download from "../download-btn"
import s from "./item-container.module.css"

const ItemContainer: React.FC = () => {
  const [selected, onSelect] = useState<string[]>([])
  const { items, isLoading, isError } = useItems(1, 25)

  const selectItem = (icon: string) => {
    onSelect([...selected, icon])
    console.log(selected)
  }

  const deselectItem = (icon: string) => {
    let newArray = selected.filter(x => x !== icon)
    onSelect(newArray)
    console.log(selected)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>
  return (
    <div className={s.container}>
      {items._items.map((item: { icon: string; name: string; }) => (
        <Item icon={item.icon} name={item.name} select={selectItem} deselect={deselectItem} />
      ))}
      <Download iconCount={selected.length} />
    </div>
  )
}

export default ItemContainer