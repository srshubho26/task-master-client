import PropTypes from 'prop-types';

const Home = ({logout}) => {
    return (
        <div>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

Home.propTypes = {
    logout: PropTypes.func
};

export default Home;