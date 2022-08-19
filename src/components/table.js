import axios from 'axios';
import { useEffect, useState } from 'react'

export default function Table(){

    const [ laureatesState, setLaureatesState ] = useState([]);
    const [searchVal, setSearchVal] = useState("");
    
    let filteredLaureatesState = (searchVal === "" ) ? laureatesState : laureatesState.filter((item) => item.firstname.toLowerCase().includes(searchVal.toLowerCase()))
    console.log(filteredLaureatesState)

    useEffect(() =>{
      axios.get('https://api.nobelprize.org/v1/laureate.json')
          .then((response) => {
            for(let i = 0; i <=100; i++){
              let result = response.data.laureates[i];
              setLaureatesState(laureatesState => [...laureatesState, {
                "id": `${result.id}`,
                "firstname": `${result.firstname}`,
                "surname": `${result.surname}`,
                "born": `${result.born}`,
                "died": `${result.died}`,
                }]);
            }
          })
          .catch((error) => {
            console.log(error)
          })
    },[])

    // console.log(laureatesState)
    return(
        <div>
            <input type="search" onChange={(e) => setSearchVal(e.target.value)} placeholder="Search..."/>

            <table>
             <thead>
               <tr>
                 <td>id</td>
                 <td>first name</td>
                 <td>surname</td>
                 <td>born</td>
                 <td>died</td>
               </tr>
             </thead>
             <tbody>
               {filteredLaureatesState 
              .map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.firstname}</td>
                  <td>{item.surname}</td>
                  <td>{item.born}</td>
                  <td>{item.died}</td>
                </tr>
              ))} 
             </tbody>

            </table>
        </div>
    )
}