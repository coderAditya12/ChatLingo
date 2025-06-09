import React from 'react'

const onboard = async() => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  return (
    <div>onboard</div>
  )
}

export default onboard