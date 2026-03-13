import React from "react";
import {Link} from "react-router-dom";

export default function VirtualizedRow({data,index,rowHeight}){

return(

<div
style={{
position:"absolute",
top:index*rowHeight,
height:rowHeight,
width:"100%"
}}
className="border-b flex justify-between p-2 bg-white"
>

<span>{data.name}</span>

<span>{data.city}</span>

<span>{data.salary}</span>

<Link to={"/details/"+index} className="text-blue-500">
Details
</Link>

</div>

)
}