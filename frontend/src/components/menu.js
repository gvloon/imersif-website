import React from 'react'
import Link from 'next/link'

export default ({selected}) => (
    <nav>
      <ul>
        <MenuItem selected={selected==='home'} href="/">home</MenuItem>
        <MenuItem selected={selected==='devices'} href="/devices">devices</MenuItem>
        <MenuItem selected={selected==='cases'} href="/cases">cases</MenuItem>
        <MenuItem selected={selected==='patterns'} href="/patterns">patterns</MenuItem>
      </ul>
    </nav>
)

const MenuItem = ({href, selected, children}) => (
  <li>
    <Link href={href}>
      <a href={href} style={selected ? { fontWeight: 'bold' } : {}}>{children}</a>
    </Link>
  </li>
)
