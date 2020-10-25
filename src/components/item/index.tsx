import React from "react"

interface Props {
  icon: string,
  name: string
}

const Icon: React.FC<Props> = props => (
  <div>
    <img src={`data:image/png;base64, ${props.icon}`} alt={props.name} />
  </div>
)

export default Icon