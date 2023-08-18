
export default (value : string, limit = 100) => {
  if(value.length < limit) return value;

   return  `${value.substring(0, limit)}...`
}
