import axios from 'axios'
import url from 'js/api.js' 


//所有的接口，都走这里，
function fetch(url,data){
    //对同一业务所有状态进行统一处理。
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(res=>{
            let status = res.data.status
            // if(status===200){
            //     resolve(res)
            // }
            // if(status===300){
            //     //假如是未登陆
            //     location.href = 'login.html'
            //     resolve(res)
            // }
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
}
export default fetch