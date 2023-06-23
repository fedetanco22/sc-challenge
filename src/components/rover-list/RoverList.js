import Image from 'next/image'

import useAppContext from '../../utils/context/useAppContext'

const RoverList = ({ data }) => {
  return (
    <div className="RoverList__container">
      {data.map(item => {
        return (
          <div key={item.id} className="RoverList__images">
            <Image
              src={item.img_src}
              alt={item.id}
              width={200}
              height={150}
              quality={100}
              priority
              className="RoverList__images__img"
            />
          </div>
        )
      })}
    </div>
  )
}

export default RoverList
