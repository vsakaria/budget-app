

import React, { useState, useEffect } from 'react';

function DaysUntil24th() {
  const [daysUntil, setDaysUntil] = useState(0);

  const [number, setNumber] = useState('');

  const handleChange = (event) => {
    setNumber(event.target.value); // Update the number state with the input value
    localStorage.setItem('number', JSON.stringify(event.target.value));
  };

  useEffect(() => {
    const storedNumber = localStorage.getItem('number');

    if (storedNumber) {
      setNumber(JSON.parse(storedNumber));
    }
  }, []);

  useEffect(() => {
    const calculateDaysUntil = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();

      let targetDate = new Date(year, month, 24);

      const dayOf25th = (new Date(year, month, 25)).getDay();
      if (dayOf25th === 0) {
        targetDate.setDate(23);
      } else if (dayOf25th === 6) {
        targetDate.setDate(24);
      }

      let timeDifference = targetDate - today;

      if (timeDifference < 0) {
        const nextMonth = month + 1;
        const nextMonthTargetDate = new Date(year, nextMonth, 24);

        const nextMonthDayOf25th = (new Date(year, nextMonth, 25)).getDay();
        if (nextMonthDayOf25th === 0) {
          nextMonthTargetDate.setDate(23);
        } else if (nextMonthDayOf25th === 6) {
          nextMonthTargetDate.setDate(24);
        }

        const daysUntilNextMonthTargetDate = Math.ceil((nextMonthTargetDate - today) / (1000 * 60 * 60 * 24));
        setDaysUntil(daysUntilNextMonthTargetDate);
      } else {
        const daysUntilTargetDate = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        setDaysUntil(daysUntilTargetDate);
      }
    };

    calculateDaysUntil();
  }, []);


  return (
    <div>
       <h1> {daysUntil}</h1> <h1>{number / daysUntil}</h1>
        <br/>
        <br/>
        <br/>
        <br/>

        <div>
          <input
            type="tel"
            id="numberInput"
            value={number}
            onChange={handleChange} // Set the handleChange function to run when the input value changes
          />
          <p>Your daily budget is:</p>
        </div>
    </div>
  );
}

export default DaysUntil24th;
