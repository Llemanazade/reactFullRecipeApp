import React from 'react'
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useParams} from 'react-router-dom'
const apiKey = "294791ef14eb46cfbca2df19c5b0543b"

function Recipe() {
  let params = useParams()
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')
    const fetchRecipe =  async() => {
    const api = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey}`)
    const data = await api.json()
    setDetails(data)
  }

  useEffect(() => {
    fetchRecipe()
    console.log(params.name)
  },[params.name])

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image}/>
      </div>
      <Info>
        <Button className = {activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab('instructions')}>Instructions</Button>
        <Button className = {activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab('ingredients')}>Ingredients</Button>
        {activeTab === 'instructions' && (
          <div>
          <h3 dangerouslySetInnerHTML={{__html:details.summary}}></h3>
          <h3 dangerouslySetInnerHTML={{__html:details.instructions}}></h3>
        </div>
        )}
        {activeTab === 'ingredients' && (
              <ul>
              {details.extendedIngredients.map((ingredient)=>
              <li key={ingredient.id}>
                {ingredient.original}
              </li>
              
              )}
            </ul>
        )}
        
      </Info>
    </DetailWrapper>
  )
}
 
const DetailWrapper = styled.div`
margin-left: 10rem;
margin-right: 10rem;
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
.active{
  background: linear-gradient(35deg, #494949, #313131);
  color: white;
  border-color: black;
}
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img{
    border-radius: 2rem;
    width: 30rem;
  }

`
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background : white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;

`
const Info = styled.div`
  margin-left: 10rem;

  
  h3 {
    font-size: 1.2rem;
  }

`
export default Recipe