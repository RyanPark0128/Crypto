import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Item = ({ API_key }) => {

  useEffect(() => {
    axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_key}&ids=BTC&interval=1d,7d,30d&convert=EUR&per-page=100&page=1`)
      // axios.get(`https://api.nomics.com/v1/exchange-rates/history?key=${API_key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&end=2021-01-26T00%3A00%3A00Z`)
      .then((response) => {
        console.log(response.data)
      })
  }, [])

  return <div>
    asd
  </div>
}

export default Item

