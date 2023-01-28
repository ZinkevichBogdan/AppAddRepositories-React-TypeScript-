import React, { useEffect, useState } from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api'


const HomePage = () => {
  const [search, setSearch] = useState('')
  const debounced = useDebounce(search)
  const { data, isError, isLoading } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, { isLoading: isReposLoading, data: repos }] = useLazyGetUserReposQuery()

  const clickHandler = (user: string) => {
    fetchRepos(user)
    setSearch('')
  }



  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>

      {isError && <p className='text-center text-red-500 '>Error...</p>}

      <div className=' relative w-[560px]'>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for Github usesrname'
        />
        <ul className=' overflow-y-scroll list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white'>
          {isLoading && <p className='text-center'>Loading...</p>}
          {data?.map((user) =>
            <li
              onClick={() => clickHandler(user.login)}
              key={user.id}
              className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            >{user.login}</li>
          )}
        </ul>

        <div className='conteiner'>
          {isReposLoading && <p>Repos is loading...</p>}
          {repos?.map((repo) => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>


    </div>
  )
}

export default HomePage
