import Axios from "axios";
import { USER_UPDATE } from "./types";

export const updateUser = ({ updatedUser, userId }) => {
    console.log(updatedUser);
    // return async (dispatch) => {
    //     try {
    //         const res = await Axios.post('http://localhost:5000/users/signup', data);
    //         console.log(res.data);
    //         console.log(res.status);

    //         dispatch({
    //             type: AUTH_SIGN_UP,
    //             payload: {token: res.data.token, user: res.data.user, status: res.status}
    //         });

    //         localStorage.setItem('JWT_TOKEN', res.data.token);
    //         localStorage.setItem('USER', JSON.stringify(res.data.user));

    //     } catch (err) {
    //         console.log(err.response.data.message);
    //         console.log(err.response.status);

    //         dispatch({
    //             type: AUTH_ERROR,
    //             payload: {status: err.response.status, errorMessage: err.response.data.message}
    //         });
    //     }
    // }
}
