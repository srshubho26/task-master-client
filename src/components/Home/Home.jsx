import PropTypes from 'prop-types';
import AllTasks from './parts/AllTasks';
import Logo from '../reusuable/Logo';

const Home = ({ logout }) => {
    return (<section className='max-w-screen-xl mx-auto'>
        <div className='flex justify-between py-5'>
            <Logo/>
            <button onClick={logout} className='px-5 pb-1 text-xl neomorphism-outset hover:neomorphism-inset hover:text-prime'>
                Logout
                </button>
        </div>
        <div className='p-5 gap-5 flex flex-col-reverse lg:flex-row w-full'>
            <AllTasks />
        </div>
        </section>);
};

Home.propTypes = {
    logout: PropTypes.func
};

export default Home;