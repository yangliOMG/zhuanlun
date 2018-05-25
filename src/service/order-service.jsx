import axios from "axios";

class Order{
    createOrder(order){
        return axios.get('/user/info.do')
    }
}

export default Order