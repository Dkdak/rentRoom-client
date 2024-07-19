import React from 'react'
import { deleteUser, getUser } from '../utils/ApiFunctions'


const Profile = () => {

    const userId = localStorage.getItem("userId")
    const [message, setMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigete = useNavigate()

    useEffect(() => {
        const fetchUser = async() => {
            const token = localStorage.getItem("token")
            try {

                const userData = await getUser(userId, token)
                setUser(userData)
            } catch(error) {
                console.error(error)
            }
        }
        fetchUser();
    }, [roomId]);
    
    /**
     * await를 사용하려면 async 함수 내에서만 사용할 수 있습니다
     */
    const handleDeleteAccount = async() => {
        const confirmed = window.confirm(
            "Are you sure you wand to delete your account? this action cannot be undone."
        )
        if(confirmed) {
            await deleteUser(login)
            .then((response) => {
                setMessage(response.data)

                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                localStorage.removeItem("userRole")
                navigate("/")
                window.location.reload()
            })
            .catch((error) => {
                setErrorMessage(error.data)
            })
        }

    }
    

    return (
        <div>Profile</div>
    )
}

export default Profile