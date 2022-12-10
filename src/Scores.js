import React, { useState, useEffect } from 'react'

import DatePicker from "react-datepicker";
import API from './api'

const Scores = () => {

  const [data, setData] = useState();
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]
    console.log(currentDate)

    API.get(`schedule`, {
      params: { date: `${currentDate}`, utc_offset: '8' },
      headers: {
        'X-RapidAPI-Key': '505ff659bcmshe451890ad66b0b5p11f007jsna7fd6c54891b',
        'X-RapidAPI-Host': 'fifa-2022-schedule-and-stats.p.rapidapi.com'
      }
    }).then((res) => {
      console.log(res);
      setData(res)
    }).catch((err) => {
      console.log(err);
    })
  }, [])


  function handleChange(event) {
    console.log(event.toISOString().split('T')[0]);

    const selectedDate = event.toISOString().split('T')[0]

    API.get(`schedule`, {
      params: { date: `${selectedDate}`, utc_offset: '8' },
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_RAPID_API_KEY}`,
        'X-RapidAPI-Host': 'fifa-2022-schedule-and-stats.p.rapidapi.com'
      }
    }).then((res) => {
      console.log(res);
      setData(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  console.log(new Date(new Date().getFullYear(), 10, 20));

  return (
    <div>

      <div className="container">

        <div className="match">
          <DatePicker
            selected={date}
            onChange={handleChange}
            minDate={new Date(new Date().getFullYear(), 10, 21)}
            maxDate={new Date(new Date().getFullYear(), 11, 18)}
          />

          {data?.data?.matches?.map(({ Home, Away }) =>


            <div className="match-content" key={Home?.IdCountry}>
              <div className="column">
                {console.log(Home?.ShortClubName, Away, "rgdhe")}
                <div className="team">
                  <h2 className="team-name">
                    {Home?.ShortClubName === undefined ? "Undetermined" : Home?.ShortClubName}</h2>
                </div>
              </div>
              <div className="column">
                <div className="match-details">

                  <div className="match-score">
                    <span
                      className="match-score-number match-score-number--leading">
                      {Home?.Score}
                    </span>
                    <span className="match-score-divider">:</span>

                    <span className="match-score-number"> {Away?.Score}</span>
                  </div>

                </div>
              </div>
              <div className="column">
                <div className="team">
                  <h2 className="team-name">
                    {Away?.ShortClubName === undefined ? "Undetermined" : Away?.ShortClubName}</h2>
                </div>
              </div>
            </div>
          )}

          {data?.data?.matches.length === 0 ?

            <div>
              <h4> No Matches Today</h4>
            </div>
            : ""
          }
        </div>
      </div>
    </div>
  )
}

export default Scores