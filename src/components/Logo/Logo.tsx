import React from 'react'
import Image from 'next/image'

const Logo = (): JSX.Element => {
  return (
    <div>
      <Image
        src="/nasa-logo.png"
        placeholder="blur"
        blurDataURL={'/icons/logo.svg'}
        alt="Nasa Logo"
        width={60}
        height={50}
      />
    </div>
  )
}

export default Logo
