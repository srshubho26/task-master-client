import PropTypes from 'prop-types';
import { FcGoogle } from 'react-icons/fc';

const Login = ({signIn}) => {
    return (
        <div className='h-screen p-2 flex justify-center items-center'>
            <div className='w-full max-w-sm neomorphism-outset p-5'>
            <div className='text-center mb-10'>
            <h2 className='text-prime text-4xl font-bold'>Task Master</h2>
            <p className='text-xl mt-2'>Please login before using this app...</p>
            </div>

            <button className='px-5 py-2 text-2xl flex neomorphism-inset items-center mx-auto gap-5 hover:neomorphism-outset hover:text-prime' onClick={signIn}>
                <span className='text-5xl'><FcGoogle /></span>
                <span>Login With Google</span>
            </button>
            </div>
        </div>
    );
};

Login.propTypes = {
    signIn: PropTypes.func
};

export default Login;