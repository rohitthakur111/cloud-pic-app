import React from 'react'
import { Link } from 'react-router-dom'

const Breadcrumbs = ({breadcrumbs = []}) => {
  return (
    <div className="breadcrumbs text-sm">
        <ul>
            {breadcrumbs.map((item,i)=> <li key={i}><Link to={item.link}>{item.title}</Link></li>)}
        </ul>
    </div>
  )
}

export default Breadcrumbs