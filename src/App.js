
import './App.css';
import React , {useState} from 'react';
const DisplaySelects = (props)=>{
  let str ="";
  for(var k=0;k<props.selects.length;k++){
    str = str + props.selects[k].join(' to ')+' ';
  }
 return( <h1>Selected Bookings :<p> {props.selects.length>0?str:"None"}</p></h1>)
}
const DisplayRejects = (props)=>{
  let str ="";
  for(var k=0;k<props.selects.length;k++){
    str = str + props.selects[k].join(' to ')+' ';
  }
 return( <h1>Rejected Bookings : <p>{props.selects.length>0?str:"None"}</p></h1>)
}
const checkValid = (s)=>{
  if(s.includes('#')){
    let a  = s.split('#');
    for(let i=0; i<a.length; i++){
      if(isNaN(a[i])){
        return false;
      }
    
    }
 return true;
  }
}
function App() {
  const [input ,setInput] = useState('');
  const [selects,setSelects] = useState([]);
  
  const [rejects,setRejects] = useState([]);
  const [error,setError] = useState('');
  const handleInput = (e) => {
    e.preventDefault();
    
    setInput(e.target.value);
    
   }
  const handleBookings = (e) => {
   e.preventDefault();
  
   // Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler
let ar = input;
let arr = ar.split(',');
for(var i = 0; i < arr.length; i++) {
  arr[i].trim();
}

let newArr = [];
// eslint-disable-next-line no-redeclare
for(var i =0;i<arr.length;i++){
    if(!checkValid(arr[i])){
      setError("Invalid Input. Please Book in the operation hourse of the resort .The operating hours are between 9: 23:59 ");
      break;
    }
    if(arr[i]>23 || arr[i]<9){
      setError("Please Book in the operation hourse of the resort .The operating hours are between 9: 23:59")
    }
    let a = arr[i].split('#');
    a[0] = parseFloat(a[0]);
    a[1] = parseFloat(a[1]);
    newArr.push(a);
    if(i===arr.length-1){
      setError('');
      // console.log(error);
    }
}

function getMaxArray(arrayOfArrays) {
  let maxArray = arrayOfArrays[0];

  for (let i = 1; i < arrayOfArrays.length; i++) {
    if (arrayOfArrays[i].length > maxArray.length) {
      maxArray = arrayOfArrays[i];
    }
  }

  return maxArray;
}
function doesOverlap(a,b){
    if(b[0]>=a[1]){
        return false;
    }
    if(b[1]<=a[0]){
        return false;
    }
    
    if(b[0]>=a[0] && b[0]<=a[1]){
        return true;
    }
    if(b[1]>=a[0] && b[1]<=a[1]){
        return true;
    }
    else {
        return false;
    }
    
}  

function overlaps(a){
    for(var i=0;i<a.length-1;i++){
        for(var j = i+1;j<a.length;j++){
            if(doesOverlap(a[i],a[j])){
                return false;
            }
        }
    }
    return true;
}


// console.log(dict);

function getAllSubsets(array) {
  const subsets = [[]]; // Initialize with an empty subset

  for (let i = 0; i < array.length; i++) {
    const currentElement = array[i];
    const subsetsLength = subsets.length;

    for (let j = 0; j < subsetsLength; j++) {
      const subset = subsets[j];
      subsets.push([...subset, currentElement]);
    }
  }

  return subsets;
}

// const displaySelect = (a)=>{
//   let content = '';
//   for(var i=0;i<a.length;i++){
//     content = content + a[i].join(' to ')+' , ';
//   }
//  return content;
// }

const subsets = getAllSubsets(newArr);
const validSubsets = subsets.filter(overlaps);
const accepted =  getMaxArray(validSubsets);
setSelects(accepted);
// setDisplaySelects(displaySelect(selects));
let rejectedBookings = [];
for(var k=0;k<newArr.length;k++){
    if(!accepted.includes(newArr[k])){
        rejectedBookings.push(newArr[k]);
    }
}
setRejects(rejectedBookings);
// setDisplayRejects(displaySelect(rejects));
// console.log('accepted bookings',accepted);
// console.log('rejected bookings',rejectedBookings);


   setInput('');
  }
 
  return (
    <div className="App">
     <h1>Resort Booking App</h1>
     <h2>The booking timings is in between 9 AM to 23.59 PM </h2>
     <form  onSubmit = {handleBookings} action="">
     <input value={input} onChange = {handleInput} type = 'text'></input>
     <button className='btn' type="submit"  >Book</button>
     </form>
     <p>{error.length!==0 && `${error}` }</p>
     <DisplaySelects selects = {selects}/>
     <DisplayRejects selects ={rejects}/>
     {/* <h1>Selected Bookings : {selects.length>0?selects:"None"}</h1>
     <h1>Rejected Bookings : {rejects.length>0?rejects:"None"}</h1> */}
    </div>
  );
}

export default App;
