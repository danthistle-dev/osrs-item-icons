import React, { useState } from "react"

interface Props {
  iconCount: number
}

const Download: React.FC<Props> = ({ iconCount }) => {

  return(
    <button>Download {iconCount} icons</button>
  )
}

export default Download