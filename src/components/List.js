import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '@material-ui/lab/Pagination'
import { useHistory } from "react-router-dom";
import './List.css'

const List = ({ API_key }) => {
  const [list, setList] = useState([])
  const [page, setPage] = useState(0)
  const [pageLength, setPageLength] = useState(0)
  const [loading, setLoading] = useState(true)
  let history = useHistory()

  useEffect(() => {
    const handleData = async () => {
      await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_key}`)
        .then((response) => {
          setList(response.data)
          setPageLength(Math.round(response.data.length / 100))
          setLoading(false)
        })
    }
    handleData()
  }, [])

  const handlePageClick = (event) => {
    setPage((Number(event.target.innerText) - 1) * 100)
  }

  const listItem =
    list.slice(page, page + 100).map((item, index) => {
      return (<div key={item.id} onClick={() => history.push(`/item/${item.symbol}`)} className="list--item__container">
        <div className="list--item__index">
          {page + index + 1}
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
          <div className="list--desc__market">
            ${Number(item.market_cap).toFixed(2)}
          </div>
          <div className="list--desc__supply">
            {item.circulating_supply} {item.symbol}
          </div>
        </div>
      </div>
      )
    })

  return loading ?
    <div className="loader--container">
      <div className="loader">
      </div>
    </div>
    :
    <div className="list--container">
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
          <div className="list--title__market">
            Market Cap
          </div>
          <div className="list--title__supply">
            Circulating Supply
          </div>
        </div>
      </div>
      {listItem}
      <div className="list--pagination">
        <Pagination onChange={(e) => handlePageClick(e)} count={pageLength} />
      </div>
    </div>
}

export default List

