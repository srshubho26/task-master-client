import { MdAddTask } from 'react-icons/md';

const Logo = () => {
    return (<h2 className='text-prime text-3xl font-semibold flex gap-2 items-center justify-center'>
        <span className='text-5xl'><MdAddTask /></span>
        <span>Task Master</span>
        </h2>);
};

export default Logo;