import { useDispatch } from "react-redux";
import { RegisterPayload } from "../../utils/api";
import { asyncRegisterUsers } from "../states/users/action";
import RegisterInput from "../components/RegisterInput";

function RegisterPage() {
    const dispatch = useDispatch();
    
    const onRegister = ({name, email, password}: RegisterPayload) => {
        dispatch(asyncRegisterUsers({ name, email, password }) as any);
    }
    return (
        <section className="bg-neutral-950 h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-auto rounded-lg px-8 py-6 bg-neutral-900 text-neutral-50 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Register Page</h1>
                <RegisterInput register={onRegister} />
                <p>Already have an account? <a href="/login" className="underline">Login</a></p>
            </div>
        </section>
    );
}

export default RegisterPage;