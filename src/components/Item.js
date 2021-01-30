import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import './Item.css'

const Item = ({ API_key }) => {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  const [chartLoading, setChartLoading] = useState(true)
  const [priceChange, setPriceChange] = useState('')
  const [marketChange, setMarketChange] = useState('')
  const [volumeChange, setVolumeChange] = useState('')
  const [dataHistory, setDataHistory] = useState([])
  const [chartType, setChartType] = useState('exchange-rates')
  const [period, setPeriod] = useState("")
  const [labelHistory, setLabelHistory] = useState([])

  const lineData = {
    labels: labelHistory,
    datasets: [{
      label: '',
      data: dataHistory,
      borderColor: ['rgba(63, 195, 128, 1)'],
      backgroundColor: ['rgba(255,255,255, 0)'],
      pointRadius: 0,
      pointHitRadius: 10
    }]
  }
  const options = {
    legend: {
      display: false
    },
    scales: {
      yAxes: [{
        ticks: {
          callback: function(value, index, values) {
            return '$' + value / 1000 + 'K';
          }
        }
      }],
      xAxes: [{
        type: 'time',
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      }]
    }
  }
  useEffect(() => {
    const fetchHistory = async () => {
      await axios.get(`https://api.nomics.com/v1/${chartType}/history?key=${API_key}&currency=BTC&start=2018-04-14T00%3A00%3A00Z&`)
        .then((response) => {
          setLabelHistory(response.data.map((item) => {
            return item[Object.keys(item)[0]]
          }))
          setDataHistory(response.data.map((item) => {
            return item[Object.keys(item)[1]]
          }))
        })
    }
    fetchHistory()
      .then(() => setChartLoading(false))
    return () => setChartLoading(true)
  }, [chartType, period])

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${API_key}&ids=BTC&interval=1d,7d,30d&convert=EUR&per-page=100&page=1`)
        .then((response) => {
          setData(response.data[0])
          setPriceChange(Number(response.data[0]['1d'].price_change_pct * 100).toFixed(2))
          setMarketChange(Number(response.data[0]['1d'].market_cap_change_pct * 100).toFixed(2))
          setVolumeChange(Number(response.data[0]['1d'].volume_change_pct * 100).toFixed(2))
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
            <div className={priceChange > 0 ? `item--percentage` : `item--percentage__negative`}>
              {priceChange}%
            </div>
          </div>
          <div className="item--price__container">
            <div className="item--price-desc">
              Market Cap
            </div>
            <div>
              ${Number(data.market_cap).toLocaleString()}
            </div>
            <div className={marketChange > 0 ? `item--percentage` : `item--percentage__negative`}>
              {marketChange}%
            </div>
          </div>
          <div className="item--price__container">
            <div className="item--price-desc">
              Volume (24h)
            </div>
            <div>
              ${Number(data['1d'].volume).toLocaleString()}
            </div>
            <div className={volumeChange > 0 ? `item--percentage` : `item--percentage__negative`}>
              {volumeChange}%
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
      <div>

        <div className="chart--container">
          <div className="chart">
            <div className="chart--buttons">
              <div className="chart--buttons__row">
                <button className={chartType === 'exchange-rates' ? 'chart--button__selected' : 'chart--button'} onClick={() => { setChartType('exchange-rates') }}>
                  Exchange Rate
              </button>
                <button className={chartType === 'market-cap' ? 'chart--button__selected' : 'chart--button'} onClick={() => { setChartType('market-cap') }}>
                  Market Cap
              </button>
                <button className={chartType === 'volume' ? 'chart--button__selected' : 'chart--button'} onClick={() => { setChartType('volume') }}>
                  Volumn
          </button>
              </div>
              <div className="chart--buttons__row2">
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  Day
          </button>
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  Week
            </button>
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  Month
            </button>
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  3 Months
            </button>
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  Year
            </button>
                <button className={period === 'volume' ? 'chart--button__selected' : 'chart--button'}>
                  All
            </button>
              </div>
            </div>
            {chartLoading ? <div>loading</div> : <Line data={lineData} options={options} />}
          </div>
          <div className="chart--info">
            <div className="stat--title__container">
              <div className="item--title__image">
                <img src={data.logo_url} />
              </div>
              <div className="stat--name__symbol">
                <div className="stat--symbol">
                  {data.symbol}
                </div>
                <div className="stat--name">
                  {data.name}
                </div>
              </div>
            </div>
            <div className="stat--second__container">
              <div className="stat-title">
                {data.symbol} Price Statistics
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  {data.name} Price
                </div>
                <div className="stat--secondary">
                  ${Number(data.price).toFixed(2)}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Price Change (24h)
                </div>
                <div className="stat--secondary">
                  <div>
                    ${data['1d'].price_change}
                  </div>
                  <div className={priceChange > 0 ? "stat--percent__positive" : "stat--percent__negative"}>
                    {priceChange > 0 ? <i className='bx bxs-chevron-up'>{priceChange}</i> : <i className='bx bxs-chevron-down' >{priceChange}</i>}%
                  </div>
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  24h High
                </div>
                <div className="stat--secondary">
                  ${Number(data.high).toFixed(2)}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Trading Volume (24h)
                </div>
                <div className="stat--secondary">
                  <div>
                    ${data['1d'].volume_change}
                  </div>
                  <div className={volumeChange > 0 ? "stat--percent__positive" : "stat--percent__negative"}>
                    {volumeChange > 0 ? <i className='bx bxs-chevron-up'>{volumeChange}</i> : <i className='bx bxs-chevron-down' >{volumeChange}</i>}%
                  </div>
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Market Rank
                </div>
                <div className="stat--secondary">
                  #{data.rank}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Market Cap
                </div>
                <div className="stat--secondary">
                  ${data.market_cap}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Circulating Supply
                </div>
                <div className="stat--secondary">
                  {data.circulating_supply} {data.symbol}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Total Supply
                </div>
                <div className="stat--secondary">
                  {data.circulating_supply} {data.symbol}
                </div>
              </div>
              <div className="stat--row">
                <div className="stat--primary">
                  Max Supply
                </div>
                <div className="stat--secondary">
                  {data.max_supply} {data.symbol}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
}

export default Item

