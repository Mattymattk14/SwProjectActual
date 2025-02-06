import React from 'react';
import './MonsterCost.css'

function MonsterCost(props) {
    return (
        <div >
            <svg 
             className='MonsterCostSvg'
             xmlns='http://www.w3.org/2000/svg'
             width={20}
             height={25}
             viewBox='0 0 20 30'>
                <ellipse cx={11} cy={12} rx={10} ry={11} fill='lightgray' stroke='black' strokeWidth={2} />
                <text x={11} y={16} fontSize={15} fill='black' textAnchor='middle' fontWeight="bold" 
                      
                // fontFamily=" 'Beleren BOld', 'Garamond', 'Georgia', serif "
                >{props.cost}</text>
            </svg>
        </div>
    );
}
export default MonsterCost;