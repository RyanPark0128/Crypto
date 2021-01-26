import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination'
import './App.css'

const key = process.env.REACT_APP_API_KEY

function App() {
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageLength, setPageLength] = useState(0)



  useEffect(() => {
    const handleData = async () => {
      await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${key}`)
        .then((response) => {
          setList(response.data)
          setPageLength(Math.round(response.data.length / 100))
        })
    }

    handleData()
  }, [])

  const handlePageClick = (event) => {
    setPage((Number(event.target.innerText) - 1) * 100)
  }

  const listItem =
    list.slice(page, page + 100).map((item) => {
      return (<div style={{ display: "flex" }}>
        <img style={{ width: "50px" }} src={item.logo_url} alt="logo" />
        <div>
          {item.name}
        </div>
        <div>
          {item.symbol}
        </div>
      </div>)
    })
  return (
    <div>
      <Header />
      {listItem}
      <Pagination onClick={(event) => handlePageClick(event)} count={pageLength} />
    </div>
  );
}

export default App;
