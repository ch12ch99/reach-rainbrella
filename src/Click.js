import React, { useState , useEffect} from "react";

export default function Click() {

  const [count, setCount] = useState('Array:');
  const temp = [];
  const handleClick = function () {
  let num = Math.floor(Math.random()*10);
  temp.push(num);

  setCount(count + "," + num);
  };
  const showCount = function(){
      console.log(count);
      console.log(temp);
  }
  useEffect(showCount);

  return <button onClick={handleClick}>{count}</button>;
}