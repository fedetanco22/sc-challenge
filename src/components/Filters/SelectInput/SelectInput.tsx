import React, { useState, memo } from 'react'
import Image from 'next/image'

import styles from './SelectInput.module.scss'

import ChevronDownSVG from '@/public/icons/chevron-down.svg'
import Button from '@/components/Button/Button'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  filterValue?: string
  setFilter?: React.Dispatch<React.SetStateAction<string>>
  title: string
  nullOptionLabel?: string
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  filterValue,
  setFilter,
  title,
  nullOptionLabel = 'Select an option',
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = (): void => {
    setIsOpen(prevIsOpen => !prevIsOpen)
  }

  const handleOptionClick = (option: Option): void => {
    setFilter && setFilter(option.value)
    setIsOpen(false)
  }

  const capitalizeLetter = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }

  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <div className={styles.select}>
        <div className={styles.header} onClick={handleToggle}>
          <div>
            {filterValue ? capitalizeLetter(filterValue) : `${nullOptionLabel}`}
          </div>
          <div>
            <Button variant={'outline'} size={'xs'} smallRoundedButton>
              <Image
                src={ChevronDownSVG}
                width={14}
                height={20}
                alt={'dropdown-arrow'}
              />
            </Button>
          </div>
        </div>
        {isOpen && (
          <div className={styles.optionList}>
            {options.map(option => (
              <div
                key={option.value}
                className={styles.options}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(CustomSelect)
