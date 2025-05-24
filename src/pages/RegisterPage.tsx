import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RegisterPayload } from "../../utils/api";
import { asyncRegisterUsers } from "../states/users/action";
import RegisterInput from "../components/RegisterInput";

function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const onRegister = ({name, email, password}: RegisterPayload) => {
        dispatch(asyncRegisterUsers({ name, email, password }) as any);
        navigate('/');
    }
    return (
        <section className="register-page">
            <RegisterInput register={onRegister} />
            <p>Already have an account? <a href="/login">Login</a></p>
        </section>
    );
}

export default RegisterPage;