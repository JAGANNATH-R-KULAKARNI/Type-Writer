import React from 'react'
//import classnames from 'classnames'

const Button = (props) => {
  const { children, className, ...otherProps } = props

  return (
    <button  {...otherProps}>
      {children}
    </button>
  )
}

export default  Button;