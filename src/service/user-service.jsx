import axios from "axios";

class User{

    getUserInfo(){
        return axios.get(`/temple/allList.do`)
    }

}

export default User