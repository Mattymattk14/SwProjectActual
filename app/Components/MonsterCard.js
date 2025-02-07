import React, { useState, useEffect } from "react";
import './MonsterCard.css';
import MonsterCost from './MonsterCost';

function MonsterCard(props) {
    const elementColors = {
        light: "siver",
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
                   <div className="MonsterCostContainer"><MonsterCost cost={props.monster.natural_stars} colors={props.monster.element}/></div> 
                <div className='MonsterElement'></div>
                </div>
                <div className='MonsterImage'>
                    <img src={`https://swarfarm.com/static/herders/images/monsters/${props.monster.image_filename}`} alt={props.monster.name} />
                </div>
                <div className='ShortDescription'>{props.monster.bestiary_slug}</div>
                <div className='MainDescription'>
                    <p>HP: {props.monster.max_lvl_hp}</p>
                    <p>ATK: {props.monster.max_lvl_attack}</p>
                    <p>DEF: {props.monster.max_lvl_defense}</p>
                    <p>SPD: {props.monster.speed}</p>                       
                </div>
            </div>
    );
}

export default MonsterCard