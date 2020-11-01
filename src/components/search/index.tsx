import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import Item from "../item"
import s from "./search.module.css"
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  select: any,
  deselect: any
}

const Search: React.FC<Props> = ({ select, deselect }) => {
  const [search, setSearch] = useState<string>("")
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getSearch = async (search: string) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://api.osrsbox.com/items?where={ "name": "${search}", "duplicate": false }`)
      setItems([...items, ...res.data._items])
      setLoading(false)
      console.log(items)
    } catch (error) {
      setLoading(false)
      toast.error("An error occurred while fetching your search, please try again.")
    }
  }

  console.log(items)

  return (
    <div className={s.container}>
      <div className={s.search}>
        <div style={{ marginLeft: "5px", marginBottom: "5px" }} className={`ui action input ${loading ? "disabled" : ""}`}>
          <input value={search} type="text" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
          <button className={`ui icon ${loading ? "loading" : ""} button`} onClick={() => getSearch(search)}>
            <i className="search icon"></i>
          </button>
        </div>
        <div style={{ marginLeft: "10px", color: "white" }}>You must enter the exact name of the item. OSRS items always start with a capital letter.</div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {items.map((item: { icon: string, name: string }, i) => (
          <Item key={i} icon={item.icon} name={item.name} select={select} deselect={deselect} />
        ))}
      </div>
      <div className="ui divider"></div>
    </div>
  )
}

export default Search