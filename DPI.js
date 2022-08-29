let n=Number(prompt("enter no.of patient:"));
let a=[],i=0;
for(i=0;i<n;i++){
    let h=prompt("patient name:");
    a.push(h)
}
for(i=0;i<n;i++){
    let ind=Math.floor(Math.random() * (n-1));
    console.log('patient '+ a[ind] + ' entered');
    var p=new Promise((res,rej)=>{    
        let t=Math.floor(Math.random() * 8000)
        setTimeout(() => {
            res(a[ind] +' takes '+t+'milisec to completed' +'\n');
        }, t)
    })
    async function fun(){
        let result =await p
        console.log(result )
    }
    await fun()
    a.splice(ind,1)
}
