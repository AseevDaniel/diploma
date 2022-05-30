import classNames from 'classnames'
import React from 'react'
import './loader.scss'

export type AllSizes = 's' | 'm' | 'l' | 'xl'

interface LoaderProps {
  size?: AllSizes
  style?: React.CSSProperties
  className?: string
  isWithoutCentering?: boolean
}

export const Loader: React.FC<LoaderProps> = ({ size = 'xl', style, className = '', isWithoutCentering }) => {
  const loaderWrapperClasses = classNames('loaderWrapper', className, size, {
    centeredLoader: !isWithoutCentering,
  })
  const loaderClasses = classNames('loader')

  return (
    <div className={loaderWrapperClasses} style={style}>
      <div className={loaderClasses}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  )
}
