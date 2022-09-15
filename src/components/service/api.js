import axios from 'axios';
async function readData(){
    const result = await axios.get(`${process.env.VUE_APP_SERVER_URL}/read/`)
    console.log(result)
    return result.data
 }
async function insertData(val){
    var arr=[]
    await axios.post(`${process.env.VUE_APP_SERVER_URL}/create/`,val)
    .then((res)=>{this.arr=res.data})
    return arr
 }
 export { readData,insertData}