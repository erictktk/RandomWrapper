import {prng_arc4} from '//cdn.jsdelivr.net/npm/esm-seedrandom/esm/arc4.min.mjs';
//import { prng_arc4 } from 'esm-seedrandom'; // from 'esm-seedrandom'

function getRandomSeed(min, max){
    return Math.floor(Math.random()*(max-min)+.5)-min;
}

/**
 * 
 * @param {Array<Object>} arr 
 * @param {Int} seed 
 * @returns 
 */
export function Choice(arr, seed=null){
  if (typeof arr !== Array){
    throw new Error('parameter {arr} needs to be of type Array!')
  }
  if (arr.length === 0 ){
    throw new Error('array has to be of length >= 1!');
  }
  const rW = new RandomWrapper(seed);
  const index = rW.randInt(0, arr.length-1);
  return arr[index];
}

class RandomWrapper{
  constructor(startSeed=null, min=0, max=10000){
    if (startSeed !== null){
      this.seed = startSeed;
      console.log("isn't random!");
    }
    else{
      this.seed = getRandomSeed(min, max);
      console.log('isRandom!!!');
    }
    this.myrng = prng_arc4(this.seed);
  }
  
  /**
   * @returns {Float}
   */
  random(min, max){
    //console.log(this.seed);
    return this.myrng.quick()*(max-min)+min;
  }
  
  /**
   * 
   * @param {*} min 
   * @param {*} max 
   * @returns 
   */
  randInt(min, max){
    var add = Math.sign(max-min)*.5;
    return Math.floor((this.myrng.quick()*(max-min)+add)+min);
  }
  
  choice(arr){
    var index = this.randInt(0, arr.length-1);
    return arr[index];
  }
}
  
export { RandomWrapper, getRandomSeed};
