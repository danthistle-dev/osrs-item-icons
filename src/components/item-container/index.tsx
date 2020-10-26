import React, { useState } from "react"
import { useItems } from "../../hooks/useItems"
import Item from "../item"
import Download from "../download-btn"
import s from "./item-container.module.css"

const ItemContainer: React.FC = () => {
  const [selected, onSelect] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const { items, isLoading, isError } = useItems(page, 50)

  const selectItem = (icon: string) => {
    onSelect([...selected, icon])
    console.log(selected)
  }

  const deselectItem = (icon: string) => {
    let newArray = selected.filter(x => x !== icon)
    onSelect(newArray)
    console.log(selected)
  }

  const changePage = (direction: string) => {
    if (direction === "next") {
      setPage(page + 1)
    } else if (direction === "prev" && page > 1) {
      setPage(page - 1)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error!</div>
  return (
    <>
      <div className={s.container}>
        {items._items.map((item: { icon: string; name: string; }) => (
          <Item icon={item.icon} name={item.name} select={selectItem} deselect={deselectItem} />
        ))}
      </div>
      <Download iconCount={selected.length} />
      <button className="ui labeled icon primary button" onClick={() => changePage("prev")}>
        <i className="left arrow icon"></i>
        Previous
      </button>
      <button className="ui right labeled icon primary button" onClick={() => changePage("next")}>
        <i className="right arrow icon"></i>
        Next
      </button>
    </>
  )
}

export default ItemContainer