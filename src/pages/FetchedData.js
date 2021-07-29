import { useEffect, useState } from 'react'

function FetchedData() {
  const [list, setList] = useState([])
  const [searchItem, setSearchItem] = useState('')
  
  useEffect(  () =>  {
    try{
      const fetchData = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'GET',
        })
        const data = await res.json();
        setList(data)
      }
      fetchData()
    }catch(err){
      console.log(err)
    }
  }, [])
  
  const handleChange = (e) => {
    const inputData = e.target.value 
    setSearchItem(inputData)
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    const filtered = list.filter((element) => {
      return element.title === searchItem
    })
    setList(filtered)
  }
  
  return (
    <div>
      <div class="list">
        Enter Search Term <input type="search" onChange={handleChange}/>
        <button onClick={handleSearch}>Search</button><br /><br />
        <h1>Fetched List Items</h1>
        {
          list.map((element) => {
            return (
              <div key={element.id}>
                <p>{element.title}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default FetchedData;