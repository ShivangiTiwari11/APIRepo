// var i;
// for (i = 0; i < 3; i++) {
//     console.log("var");
//     setTimeout(function print(){
//         console.log(i)
//     }, 1);
//    console.log(i);
//   }
// {let j;
// for (j = 0; j < 3; j++) {
//     console.log("let ");
//     setTimeout(function print(){
//                 console.log(j)
//             }, 1);
//     console.log(j);
// }}
function max( a,  b){
  if(a>b)
  return a;
  return b;
}
let  A = [1, 2, 3, 4, -10] 
let maxSum=A[0];
let sum=0;
for(let i=1;i<5;i++)
{
    sum+=A[i];
    console.log("sum",sum);
    maxSum=max(sum,maxSum);
    console.log("max", maxSum);
    if(sum<0) sum=0;
}
console.log("maxsum",maxSum);
