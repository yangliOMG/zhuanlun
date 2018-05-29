import axios from "axios";

class Temple{

    getTempleListAll(index){
        return axios.get(`/temple/allList.do`,{params: {
            index:1,
            page:5*index
          }})
    }

    getTempleListByTag(tag,index){
        return axios.get(`/temple/tagList.do`,{params: {
            tag,
            index:1,
            page:5*index
          }})
    }

    getTempleListByName(name,index){
        return axios.get(`/temple/nameList.do`,{params: {
            name,
            index:1,
            page:5*index
          }})
    }

    getTempleListByPicker(province,sect,tag,index){
        return axios.get(`/temple/proAndSectList.do`,{params: {
            province,
            sect,
            tag,
            index:1,
            page:5*index
          }})
    }

    getTempleById(tid){
        return axios.get(`/temple/info.do`,{params: {
            tid
        }})
    }



    
    getTowerById(id){
        return axios.get(`/facility/info.do`,{params: {
            id
        }})
    }
}

export default Temple