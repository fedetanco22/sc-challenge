import React from 'react'
import Link from 'next/link'

import styles from './Navbar.module.css'

import Button from '@/components/Button/Button'
import Logo from '@/components/Logo/Logo'

export default function Navbar(): JSX.Element {
  return (
    <nav className={`${styles.navbar}`}>
      <div className={styles.linkList}>
        <Link href={'/'} className={styles.logo} data-testid="logo-link">
          <Button variant={'link'} size={'md'}>
            <Logo />
          </Button>
        </Link>
        <Link href={'/'} className={styles.link}>
          <Button variant={'link'} size={'sm'}>
            Discover
          </Button>
        </Link>
        <Link href={'/'} className={styles.link}>
          <Button variant={'link'} size={'fullWidth'}>
            What we do
          </Button>
        </Link>
      </div>
      <div className={styles.button}>
        <Button variant={'outline'} size={'sm'}>
          Connect Account
        </Button>
      </div>
    </nav>
  )
}
