import Image from 'next/image'

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
            <div>
              <p className="RoverList__images__text">
                <span className="RoverList__images__text__span">ID:</span>{' '}
                {item.id}
              </p>
              <p className="RoverList__images__text">
                <span className="RoverList__images__text__span">Camera:</span>{' '}
                {item.camera.full_name}
              </p>
              <p className="RoverList__images__text">
                <span className="RoverList__images__text__span">
                  Earth Date:
                </span>{' '}
                {item.earth_date}
              </p>
              <p className="RoverList__images__text">
                <span className="RoverList__images__text__span">
                  Martian Sol Date:
                </span>{' '}
                {item.sol}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RoverList
