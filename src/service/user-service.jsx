import axios from "axios";

class User{

    getUserInfo(code){
        return axios.get(`/login/login.do`,{params: {
            code
          }})

    }

}

export default User