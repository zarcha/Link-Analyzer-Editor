import { hex2int, int2hex } from "./util.js";

let navi;

let locations = {
    navi: {
        start: 0,
        length: 1
    },
    petId: {
        start: 2,
        length: 2
    },
    owner: {
        start: 4,
        length: 5
    },
    level: {
        start: 9,
        length: 1
    },
    experiance: {
        start: 10,
        length: 2
    },
    health: {
        start: 12,
        length: 1
    },
    attack: {
        start: 13,
        length: 1
    },
    wins: {
        start: 16,
        length: 1
    },
    losses: {
        start: 17,
        length: 1
    },
    unkownSprite: {
        start: 228,
        length: 122
    },
    crossSprite: {
        start: 356,
        length: 122
    },
    loseSprite: {
        start: 484,
        length: 122
    },
    winSprite: {
        start: 612,
        length: 122
    }
}

function getNaviData(){
    return navi;
}

function setNaviData(data){
    navi = data;
}

function getNaviId(){
    return hex2int(getValue("navi"));
}

function setNaviId(int){
    let hexValue = int2hex(int);
    
    navi = setValue("navi", hexValue);
}

function getPETId(){
    return hex2int(getValue("petId"));
}

function setPETId(int){
    let hexValue = int2hex(int);
    
    navi = setValue("petId", hexValue);
}

function getOwner(){
    return hex2int(getValue("owner"));
}

function setOwner(value){
    setValue("owner", int2hex(value));
}

function getLevel(){
    return hex2int(getValue("level"));
}

function setLevel(value){
    navi = setValue("navi", int2hex(value));
}

function getExperiance(){
    return hex2int(getValue("experiance"));
}

function setExperiance(int){
    let hexValue = int2hex(int);
    
    navi = navi.replaceAt(locations.experiance.start * 2, (locations.experiance.start * 2) + (locations.experiance.length * 2), hexValue);
}

function getHealth(){
    return hex2int(getValue("health")) * 10;
}

function setHealth(int){
    let hexValue = int2hex(int);
    
    navi = navi.replaceAt(locations.health.start * 2, (locations.health.start * 2) + (locations.health.length * 2), hexValue);
}

function getAttack(){
    return hex2int(getValue("attack"));
}

function setAttack(int){
    let hexValue = int2hex(int);
    
    navi = navi.replaceAt(locations.attack.start * 2, (locations.attack.start * 2) + (locations.attack.length * 2), hexValue);
}

function getWins(){
    return hex2int(getValue("wins"));
}

function setWins(int){
    let hexValue = int2hex(int);
    
    navi = navi.replaceAt(locations.wins.start * 2, (locations.wins.start * 2) + (locations.wins.length * 2), hexValue);
}

function getLosses(){
    return hex2int(getValue("losses"));
}

function setLosses(int){
    let hexValue = int2hex(int);
    
    navi = navi.replaceAt(locations.losses.start * 2, (locations.losses.start * 2) + (locations.losses.length * 2), hexValue);
}

function getValue(field){
    return navi.substr(locations[field].start * 2, locations[field].length * 2)
}

function setValue(field, value){
    navi = navi.replaceAt(locations[field].start * 2, (locations[field].start * 2) + (locations[field].length * 2), value);
}

String.prototype.replaceAt = function(start, end, replacement){
    return this.substring(0, start - 1) + replacement + this.substring(end + 1, this.length);
}

export default {
    getNaviData: () => { return navi },
    setNaviData: (data) => navi = data,
    getPETId: hex2int(getValue(getPETId)),
    setPETId,
    getNaviId,
    setNaviId,
    getOwner,
    setOwner,
    getLevel,
    setLevel,
    getExperiance,
    setExperiance,
    getHealth,
    setHealth,
    getAttack,
    setAttack,
    getWins,
    setWins,
    getLosses,
    setLosses
}