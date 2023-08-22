import React from 'react'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

import styles from './RoverCard.module.scss'

import Button from '@/components/Button/Button'
import { MarsImage } from '@/src/interfaces/Interfaces'
import CandlesticksSVG from '@/public/icons/candlesticks.svg'
import ScatterSVG from '@/public/icons/scatter.svg'
import HeartSVG from '@/public/icons/heart.svg'

interface RoverProps {
  rover: MarsImage
}

const overlayVariants: Variants = {
  hidden: {
    opacity: 0,
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0)',
  },
  visible: {
    opacity: 1,
    borderRadius: '16px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transition: { duration: 0.3 },
  },
}

const hoverContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '8px 8px 16px',
}

const containerStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}

const spanStyles: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  lineHeight: '12px',
  padding: '8px 8px 6px 8px',
  borderRadius: '8px',
  backgroundColor: '#45b26b',
  color: '#fcfcfd',
  textTransform: 'uppercase',
}

const RoverCard: React.FC<RoverProps> = ({ rover }): JSX.Element => {
  return (
    <div className={styles.roverCard}>
      <div className={styles.image}>
        <motion.div
          className={styles.overlay}
          initial="hidden"
          whileHover="visible"
          variants={overlayVariants}
        >
          <div style={hoverContainerStyles}>
            <div style={containerStyles}>
              <span style={spanStyles}>Type</span>
              <Button
                variant={'outline'}
                size="xs"
                smallRoundedButton
                inlineStyles={{ backgroundColor: '#23262F', border: 'none' }}
              >
                <Image src={HeartSVG} alt={'heart'} />
              </Button>
            </div>

            <Button
              variant={'primary'}
              size="md"
              inlineStyles={{ maxWidth: '70%' }}
              icon={<Image src={ScatterSVG} alt={'scatter'} />}
            >
              Place a bid
            </Button>
          </div>
        </motion.div>
        <Image
          src={rover.img_src}
          alt={`${rover.id}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 768px"
          // className="RoverList__images__img"
        />
        {/* <Image
          src={rover.}
          alt={`${rover.author}-${rover.media.id}`}
          fill
          
        /> */}
      </div>
      <div className={styles.roverCardInfo}>
        <div className={styles.roverCardInfoTitle}>
          <h3 className={styles.title}>Amazing digital art</h3>
          <span className={styles.instantPrice}>900</span>
        </div>
        <div className={styles.roverBid}>
          <div>
            {/* {rover.bidUsers.length > 0 && (
              <div className={styles.roverBidUsers}>
                {rover.bidUsers.map((user, index) => (
                  <div
                    key={index}
                    className={styles.roverBidUser}
                    style={{
                      zIndex: index + 1,
                      left: index * 16,
                      border: '2px solid #23262f',
                    }}
                  >
                    <CircleImage
                      src={user.avatar}
                      alt={user.name}
                      width={24}
                      height={24}
                    />
                  </div>
                ))}
              </div>
            )} */}
            <div className={styles.roverStock}>
              <span className={styles.stock}>2 in stock</span>
            </div>
          </div>
        </div>
        <div className={styles.highestBidContainer}>
          <div className={styles.highestBid}>
            <Image
              src={CandlesticksSVG}
              alt={'candlesticks'}
              width={20}
              height={20}
            />
            <div>
              <span className={styles.highestBidTitle}>Highest bid</span>
              <span className={styles.highestBidValue}>9.00</span>
            </div>
          </div>

          <p className={styles.newBidButton}>&#128293; New Bid</p>
        </div>
      </div>
    </div>
  )
}

export default RoverCard
