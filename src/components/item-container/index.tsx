import React, { useState, useEffect } from "react"
import axios from "axios"
import JSZip from "jszip"
import { saveAs } from "file-saver"
import { toast } from "react-toastify"
import Item from "../item"
import Download from "../download-btn"
import Search from "../search"
import s from "./item-container.module.css"
import 'react-toastify/dist/ReactToastify.css';

type item = {
  icon: string,
  name: string
}

const ItemContainer: React.FC = () => {
  const [selected, onSelect] = useState<item[]>([])
  const [page, setPage] = useState<number>(1)
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getResults = async (page: number) => {
    setLoading(true)
    try {
      const res = await axios.get(`https://api.osrsbox.com/items?page=${page}&max_results=50`)
      setItems([...items, ...res.data._items])
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error("An error occured while fetching the icons, please try again.")
    }
  }

  useEffect(() => {
    getResults(page)
  }, [page])

  const selectItem = (icon: string, name: string) => {
    onSelect([...selected, { icon, name }])
  }

  const deselectItem = (icon: string) => {
    let newArray = selected.filter((x: item) => x.icon !== icon)
    onSelect(newArray)
  }

  const downloadZip = () => {
    var zip = new JSZip()
    zip.file("READ_ME.txt", "This web app has no affiliation with Old School Runescape or JAGEX.\nThe logo and icons are copyright Jagex Ltd.\n")
    selected.map(item => {
      zip.file(`${item.name}.png`, item.icon, { base64: true })
    })
    zip.generateAsync({type: "blob"})
      .then((content) => {
        saveAs(content, "icons.zip")
      })
  }

  return (
    <>
      <Search select={selectItem} deselect={deselectItem} />
      <div className={s.container}>
        {items.map((item: { icon: string; name: string; }, i) => (
          <Item key={i} icon={item.icon} name={item.name} select={selectItem} deselect={deselectItem} />
        ))}
      </div>
      <button 
        style={{ position: "fixed", left: "20px", bottom: "20px" }} 
        className={`ui primary ${loading ? "loading disabled" : ""} button`} 
        onClick={() => {
          setPage(page + 1)
        }}>
          Load more
        </button>
      <Download downloadZip={downloadZip} iconCount={selected.length} />
    </>
  )
}

export default ItemContainer