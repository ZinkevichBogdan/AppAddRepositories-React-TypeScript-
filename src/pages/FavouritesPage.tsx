import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/models'



const FavouritePage = () => {

  const { favourites } = useAppSelector(state => state.github)

  if (favourites.length === 0) return <p className=' text-center'>No items...</p>


  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
      <ul className=' list-none'>
        {favourites.map(f => (
          <li>

            <a href={f}>{f}</a>
          </li>
        ))}
      </ul>


    </div>
  )
}

export default FavouritePage
