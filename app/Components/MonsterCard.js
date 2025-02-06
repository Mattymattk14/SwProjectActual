import React, { useState, useEffect } from "react";
import './MonsterCost.css';
import MonsterCost from './MonsterCost';

function MonsterCard(props) {
    const elementColors = {
        light: "white",
        dark: "purple",
        fire: "red",
        water: "blue",
        wind: "yellow",
    };
 
    return (
            <div className='MonsterCard'
            style={{backgroundColor: elementColors[props.monster.element.toLowerCase()] || "gray"}}>
                <div className='MonsterTitleContainer'>
                <div className='MonsterTitle'>{props.monster.name}
                </div>
                    <MonsterCost cost={props.monster.natural_stars}/>
                <div className='MonsterElement'></div>
                </div>
                <div className='MonsterImage'>
                    <img src={`https://swarfarm.com/static/herders/images/monsters/${props.monster.image_filename}`} alt={props.monster.name} />
                </div>
                <div className='ShortDescription'>Short Description Here</div>
                <div className='MainDescription'>
                    HP: {props.monster.max_lvl_hp} 
                    ATK: {props.monster.max_lvl_attack}
                    DEF: {props.monster.max_lvl_defense}
                    SPD: {props.monster.speed}   
                </div>
            </div>
    );
}

export default MonsterCard