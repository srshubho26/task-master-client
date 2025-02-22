import axios from "axios";
import swal from "sweetalert";

const withCredentials = axios.create({
    baseURL: 'https://task-master-server-mocha.vercel.app',
    withCredentials: true
});

// callback is using to get the loading state changing function
const useAxiosWithCredentials = (callback) => {
    withCredentials.interceptors.response.use(null, () => {
        callback && callback(false);
        swal('Oops!', "Something went wrong!", 'error');
    })

    return withCredentials;
};

export default useAxiosWithCredentials;