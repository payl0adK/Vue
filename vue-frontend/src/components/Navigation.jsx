import React from 'react'

const Navigation = () => {
  return (
    <ul className="nav">
  <li className="nav-item">
    <a className="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/">Home</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/app">App</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="/login">Sign in</a>
  </li>
  <li className="nav-item">
    <a className="nav-link disabled">Disabled</a>
  </li>
</ul>
  )
}

export default Navigation