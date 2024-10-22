import { io } from 'socket.io-client';
import {proxy} from 'valtio';

const state = proxy({
    socket :null,
})
export default state;