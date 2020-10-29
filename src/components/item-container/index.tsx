import React, { useState, useEffect } from "react"
import axios from "axios"
import Item from "../item"
import Download from "../download-btn"
import s from "./item-container.module.css"

const ItemContainer: React.FC = () => {
  const [selected, onSelect] = useState<string[]>([])
  const [page, setPage] = useState<number>(1)
  const [items, setItems] = useState<any[]>([])
  const [error, setError] = useState<object>()
  const [loading, setLoading] = useState<boolean>(false)

  const getResults = async (page: number) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://api.osrsbox.com/items?page=${page}&max_results=50`)
      setItems([...items, ...res.data._items])
      console.log(res.data._items)
      setLoading(false)
    } catch (error) {
      setError(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getResults(page)
  }, [])

  console.log(items)

  const selectItem = (icon: string) => {
    onSelect([...selected, icon])
    console.log(selected)
  }

  const deselectItem = (icon: string) => {
    let newArray = selected.filter(x => x !== icon)
    onSelect(newArray)
    console.log(selected)
  }

  return (
    <>
      <div className={s.container}>
        {items.map((item: { icon: string; name: string; }, i) => (
          <Item key={i} icon={item.icon} name={item.name} select={selectItem} deselect={deselectItem} />
        ))}
      </div>
      <button style={{ position: "fixed", left: "20px", bottom: "20px" }} className="ui primary button" onClick={() => {
        setPage(page + 1)
        getResults(page)
      }}>Load more</button>
      <Download iconCount={selected.length} />
    </>
  )
}

export default ItemContainer