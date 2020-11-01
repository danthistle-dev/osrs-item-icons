import React, { useState } from "react"
import s from "./download-btn.module.css"

interface Props {
  iconCount: number,
  downloadZip: any
}

const Download: React.FC<Props> = ({ iconCount, downloadZip }) => {

  return(
    <button onClick={() => downloadZip()} className={s.container + ` ui primary ${iconCount === 0 ? "disabled" : ""} button`}>
      {iconCount === 0 ? "Select at least one icon" : `Download ${iconCount} icon(s)`}
    </button>
  )
}

export default Download