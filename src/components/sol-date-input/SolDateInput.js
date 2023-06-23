import { useState } from 'react'

function SolDateInput({ maxSol, handleSolDate, sol }) {
  const handleSolDateChange = event => {
    handleSolDate(event.target.value)
  }

  return (
    <>
      <input
        type="number"
        onChange={handleSolDateChange}
        value={sol}
        placeholder={`Enter a sol date between 0 and ${maxSol}`}
      />
    </>
  )
}

export default SolDateInput