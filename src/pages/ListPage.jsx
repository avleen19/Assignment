import React,{useEffect,useState,useRef} from "react";
import {calculateVisibleRows} from "../utils/virtualization";
import VirtualizedRow from "../components/VirtualizedRow";
import {Link} from "react-router-dom";

export default function ListPage(){

const [employees,setEmployees]=useState([])
const [scrollTop,setScrollTop]=useState(0)

const containerRef=useRef(null)

const rowHeight=50
const containerHeight=400

useEffect(() => {

  const formData = new FormData();
  formData.append("username", "test");
  formData.append("password", "123456");

  fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {

      console.log("API RESPONSE:", data);

      if (Array.isArray(data)) {
        setEmployees(data);
      } else if (data.data) {
        setEmployees(data.data);
      } else {
        setEmployees([]);
      }

    })
    .catch(err => {
      console.log("API ERROR:", err);
    });

}, []);

const {startIndex,endIndex}=calculateVisibleRows(
scrollTop,rowHeight,containerHeight,employees.length
)

const visibleRows=employees.slice(startIndex,endIndex)

return(

<div className="p-6">

<h1 className="text-xl mb-4">Employee List</h1>

<div
ref={containerRef}
className="border overflow-auto"
style={{height:containerHeight}}
onScroll={(e)=>setScrollTop(e.target.scrollTop)}
>

<div style={{height:employees.length*rowHeight}}>

{visibleRows.map((emp,i)=>{

const index=startIndex+i

return(
<VirtualizedRow
key={index}
index={index}
data={emp}
rowHeight={rowHeight}
/>
)

})}

</div>

</div>

<Link to="/analytics" className="text-blue-500 mt-4 block">
View Analytics
</Link>

</div>

)
}