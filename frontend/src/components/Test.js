import React, { useState, useEffect } from 'react'

export default function Test() {
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    console.log('new counter value is ' + counter);
    return () => {
      console.log('previous counter value is ' + counter)
    }
  }, [counter])

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
      <button onClick={() => setCounter(counter - 1)}>Decrease</button>
    </div>
  )
}
