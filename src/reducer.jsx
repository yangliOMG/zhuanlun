/*
 * @Author: yangli 
 * @Date: 2018-05-09 15:07:42 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-05-17 17:20:18
 */
import {combineReducers} from 'redux'
import {user} from './redux/user.redux.jsx'
import {order} from './redux/order.redux.jsx'


export default combineReducers({user,order})