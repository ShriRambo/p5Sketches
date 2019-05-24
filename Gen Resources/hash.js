/**
 * 
 * This script contains some functions to  hash a string 
 * and convert it to some integer or something. These functions 
 * can be used to generate a seed for random number generator 
 * to use for some specific case for particular string.
 * 
 */


 // Case sensitive function
hashCode = function(s){
    return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }


// Ignoring the case
hashCode = function(s){
    return s.toLowerCase().split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
  }