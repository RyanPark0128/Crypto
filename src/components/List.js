import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination'
import './List.css'

const key = process.env.REACT_APP_API_KEY

const List = () => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(0)

  useEffect(() => {
    const handleData = async () => {
      await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${key}`)
        .then((response) => {
          setList(response.data)
          setPageLength(Math.round(response.data.length / 100))
          console.log(response.data[0])
          console.log(response.data[0]['1d'].volume)
        })
    }

    handleData()
  }, [])

  const handlePageClick = (event) => {
    setPage((Number(event.target.innerText) - 1) * 100)
  }


  const listItem =
    list.slice(page, page + 100).map((item, index) => {
      return (<div key={item.id} className="list--item__container">
        <div className="list--item__index">
          {index + 1}
        </div>
        <img className="list--image" src={item.logo_url} alt="logo" />
        <div className="list--name">
          {item.name}
        </div>
        <div className="list--symbol">
          {item.symbol}
        </div>
        <div className="list--item__desc">
          <div className="list--desc__price">
            ${Number(item.price).toFixed(2)}
          </div>
          <div className="list--desc__price">
            {Number(item['1d'].price_change_pct * 100).toFixed(2)}%
          </div>
          <div className="list--desc__price">
            {Number(item['7d'].price_change_pct * 100).toFixed(2)}%
          </div>
          <div className="list--desc__market">
            ${Number(item.market_cap).toFixed(2)}
          </div>
          <div className="list--desc__market">
            ${item['1d'].volume}
          </div>
          <div className="list--desc__supply">
            {item.circulating_supply} {item.symbol}
          </div>
        </div>
      </div>
      )
    })

  return (<div className="list--container">
    <div className="list--title__container">
      <div className="list--item__index">
        #
        </div>
      <div className="list--title__name">
        Name
        </div>
      <div className="list--title__desc">
        <div className="list--title__price">
          Price
          </div>
        <div className="list--title__price">
          24H
          </div>
        <div className="list--title__price">
          7D
          </div>
        <div className="list--title__market">
          Market Cap
          </div>
        <div className="list--title__market">
          Volumn
          </div>
        <div className="list--title__supply">
          Circulating Supply
          </div>
      </div>
    </div>
    {listItem}
    <div className="list--pagination">
      <Pagination onClick={(event) => handlePageClick(event)} count={pageLength} />
    </div>
  </div>
  )
}

export default List

