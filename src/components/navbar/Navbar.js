import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  return (
    <header>
      <nav>
        <div className="RootPage">
          <Link href="/" className="RootPage__logo">
            <Image
              src="/nasa-logo.png"
              alt="Next.js Logo"
              width={50}
              height={40}
              priority
            />
            <p>Southern Code Challenge</p>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
