import axios from 'axios';
async function readData(){
    return   await axios.get(`${process.env.VUE_APP_SERVER_URL}/view/`)
}
async function insertData(val){
    return await axios.post(`${process.env.VUE_APP_SERVER_URL}/insert/`,val)
    .then((res)=>{this.arr=res.data})
    
 }
 async function editData(item){
    console.log("process")
    return await axios.put(`${process.env.VUE_APP_SERVER_URL}/update/`,item) 
 }
 async function deleteData(item){
    console.log(item);
    return await axios.delete(`${process.env.VUE_APP_SERVER_URL}/drop/${item}`)
 }
 async function sortIdAsc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/idA/`)
 }
 async function sortIdDesc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/idD/`)
 }
 async function sortNameAsc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/nameA/`)
 }
 async function sortNameDesc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/nameD/`)
 }
 async function sortStaffAsc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/staffA/`)
 }
 async function sortStaffDesc(){
    return await axios.get(`${process.env.VUE_APP_SERVER_URL}/staffD/`)
 }

 
 export { readData,insertData,editData,deleteData,sortIdAsc,sortIdDesc,sortNameAsc,sortNameDesc,sortStaffAsc,sortStaffDesc}