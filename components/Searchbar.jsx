import { useRouter } from 'next/router';
import { useState } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
const Searchbar = () =>{
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search?searchTerm=${searchTerm}`)
  }
  return (
  <form onSubmit={handleSubmit} autoComplete='off' className='p-2 text-gray-400 focus-within:text-gray-600 ' >
    <label htmlFor="search-field" className="sr-only">
      Search All songs
    </label>
    <div className="flex flex-row justify-start items-center  ">
      <AiOutlineSearch className="w-5 h-5 ml-4 " />
      <input type="text" name='search-field' autoComplete='off' id='search-field' placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4 "  />
    </div>
  </form>
)};

export default Searchbar;
