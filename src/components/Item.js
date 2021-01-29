import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Item.css'

const Item = ({ API_key }) => {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_key}&ids=BTC&interval=1d,7d,30d&convert=EUR&per-page=100&page=1`)
        // axios.get(`https://api.nomics.com/v1/exchange-rates/history?key=${API_key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2021-01-26T00%3A00%3A00Z`)
        .then((response) => {
          setData(response.data[0])
          console.log(response.data[0])
          setLoading(false)
        })
    }
    fetchData();
  }, [])

  return loading ? <div>
    loading
  </div>
    :
    <div className="item--container">
      <div className="item--title__container">
        <div className="item--info__container">
          <div className="item--info__row">
            <div className="item--title__image">
              <img src={data.logo_url} />
            </div>
            <div className="item--title__name">
              {data.name}
            </div>
            <div className="item--title__symbol">
              {data.symbol}
            </div>
          </div>
          <div>
            <div className="item--title__rank">
              Rank #{data.rank}
            </div>
          </div>
        </div>
        <div className="item--number__container">
          <div className="item--price__container">
            <div className="item--price-desc">
              {data.name} Price ({data.symbol})
            </div>
            <div>
              ${(Number(data.price)).toLocaleString()}
            </div>
            <div className="item--percentage">
              {Number(data['1d'].price_change_pct * 100).toFixed(2)}%
            </div>
          </div>
          <div className="item--price__container">
            <div className="item--price-desc">
              Market Cap
            </div>
            <div>
              ${Number(data.market_cap).toLocaleString()}
            </div>
            <div className="item--percentage">
              {Number(data['1d'].market_cap_change_pct * 100).toFixed(2)}%
            </div>
          </div>
          <div className="item--price__container">
            <div className="item--price-desc">
              Volume
            </div>
            <div>
              ${Number(data['1d'].volume).toLocaleString()}
            </div>
            <div className="item--percentage">
              {Number(data['1d'].volume_change_pct * 100).toFixed(2)}%
            </div>
          </div>
          <div className="item--price__container">
            <div className="item--price-desc">
              Circulating Supply
            </div>
            <div>
              {Number(data.circulating_supply).toLocaleString()} {data.symbol}
            </div>
          </div>
        </div>
      </div>
    </div>
}

export default Item

