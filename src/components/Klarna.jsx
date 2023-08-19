import { useEffect, useState } from "react"

const Klarna = () => {
    const [data, setData] = useState([])
    useEffect(()=>{
        const fetchData = async() =>{
            try{

                const response = await fetch('/api/data')
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json()
                setData(jsonData)

            }catch (error) {
                console.error(error)
              }
        }
        fetchData()
    },[])
    console.log(data)
    return <h1>testaa</h1>
}

export default Klarna