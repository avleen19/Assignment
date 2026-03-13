import React from "react";

export default function SVGBarChart({data}){

const cities={}

data.forEach(emp=>{
cities[emp.city]=(cities[emp.city]||0)+Number(emp.salary||0)
})

const entries=Object.entries(cities)

return(

<svg width="500" height="300">

{entries.map(([city,val],i)=>{

const height=val/1000

return(

<g key={city}>

<rect
x={i*60}
y={250-height}
width="40"
height={height}
fill="blue"
/>

<text x={i*60} y="270">
{city}
</text>

</g>

)

})}

</svg>

)
}