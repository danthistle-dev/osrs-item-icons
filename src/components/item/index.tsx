import React, { useState } from "react"
import s from "./item.module.css"

interface Props {
  icon: string,
  name: string,
  select: any,
  deselect: any
}

const Icon: React.FC<Props> = ({ icon, name, select, deselect }) => {
  const [selected, toggleSelect] = useState(false)

  const onSelect = () => {
    toggleSelect(!selected)
    selected ? deselect(icon) : select(icon)
  }

  return(
    <div className={s.container}>
      <div 
        className={`${s.item} ${selected ? s.selected : s.unselected}`}
        onClick={() => onSelect()}
        data-tooltip={name}
      >
        <img src={`data:image/png;base64, ${icon}`} alt={name} />
        {selected ? (
          <div className={s.check}>
            <i className="fas fa-check"></i>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Icon