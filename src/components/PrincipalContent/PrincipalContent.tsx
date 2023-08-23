import React, { memo } from 'react'
import Image from 'next/image'

import styles from './PrincipalContent.module.css'
import ImagePanel from './ImagePanel/ImagePanel'

import Button from '@/components/Button/Button'
import CircleImage from '@/components/CircleImage/CircleImage'
import StopSVGIcon from '@/public/icons/stop.svg'
import ProfilePicture from '@/public/images/profile.svg'
import PrincipalImage from '@/public/images/principal.svg'
import { DM_SansFont, PoppinsFont } from '@/utils/fonts'

function PrincipalContent(): JSX.Element {
  return (
    <div className={styles.grid}>
      <div className={styles.panels}>
        <ImagePanel>
          <Image
            src={PrincipalImage}
            alt={`principal content`}
            priority={true}
            quality={40}
            width="0"
            height="0"
            sizes={`(max-width: 768px) 100vw, 768px`}
            style={{ width: '100%', height: 'auto' }}
          />
        </ImagePanel>
      </div>
      <div className={`${styles.panels} ${styles.rightPanel}`}>
        <div className={styles.panelContent}>
          <div>
            <h1 className={DM_SansFont.className}>Southern Code Challenge</h1>
            <div className={`${styles.avatarContent} ${PoppinsFont.className}`}>
              <div className={styles.content}>
                <CircleImage
                  src={ProfilePicture}
                  alt="Author profile picture"
                  width={40}
                  height={40}
                />
                <div>
                  <p className={styles.captionTitle}>Creator</p>
                  <p className={styles.caption}>Federico Tanco</p>
                </div>
              </div>
              <div className={styles.content}>
                <CircleImage
                  src={StopSVGIcon}
                  alt="icon"
                  width={20}
                  height={20}
                  bgColor="#45b26b"
                  divStyles={{ width: '40px', height: '40px' }}
                />
                <div>
                  <p className={styles.captionTitle}>Position:</p>
                  <p className={styles.caption}>Frontend Developer</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <Button variant={'primary'} size={'fullWidth'}>
              Contact the creator
            </Button>
            <Button variant={'outline'} size={'fullWidth'}>
              View pics
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(PrincipalContent)
