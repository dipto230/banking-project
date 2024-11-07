import React from "react"
import CountUp from "react-countup"

const AnimatedCounter = ({amount}:{amount :number}) => {
  return (
    <div>
        <CountUp className="w-full"
        duration={4}
        decimals={2}
        decimal =","
        prefix="$"
        
        
        
        end ={amount}></CountUp>
        
    </div>
  )
}

export default AnimatedCounter