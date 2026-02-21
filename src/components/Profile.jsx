import UpdateProfile from './UpdateProfile'
import { useSelector } from 'react-redux'
import UserCard from './userCard';

const Profile = () => {
    const user = useSelector((state) => state.user);
    return (
        <div>
            <UpdateProfile user={user.user} />
        </div>
    )
}

export default Profile