import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'


const apiKey = "294791ef14eb46cfbca2df19c5b0543b"
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`
const Card = styled.div`
min-height: 12rem;
position: relative;
border-radius: 2rem;
overflow: hidden;

img{
  border-radius: 2rem;
    width: 100%;
    
}
a{
  text-decoration: none;

}

h4{
  text-align: center;
  padding: 1rem;
}
`

export default function Cuisine() {
  
  let params = useParams()
  const [cuisine, setCuisine] = useState([])
  useEffect(() => {
    getCuisine(params.type)
    console.log(params.type)
    console.log(cuisine)
  },[params.type])

  const getCuisine = async(name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&cuisine=${name}`)
    const recipes = await data.json();
    setCuisine(recipes.results);
  }
  return (
    <Grid>
      {cuisine.map((item) => {return(
        <Card key={item.id}>
              <Link to={'/recipe/' + item.id}>
              <img src = {item.image} alt= {item.title}/>
              <h4>{item.title}</h4>
              </Link>
        </Card>
      )})}
    </Grid>
  )
}
