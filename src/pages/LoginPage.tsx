import { useDispatch } from "react-redux";
import LoginInput from "../components/LoginInput";
import { LoginPayload } from "../../utils/api";
import { asyncSetAuthUser } from "../states/authUser/action";

function LoginPage() {
    const dispatch = useDispatch();

    const onLogin = ({ email, password }: LoginPayload) => {
        dispatch(asyncSetAuthUser({ email, password }) as any);
    }
    return (
        <section className="bg-neutral-950 h-screen flex items-center justify-center">
            <div className="max-w-md w-full mx-auto rounded-lg px-8 py-6 bg-neutral-900 text-neutral-50 space-y-4">
                <h1 className="text-2xl font-bold mb-4">Login Page</h1>
                <LoginInput login={onLogin} />
                <p className="text-neutral-700">Don't have an account? <a href="/register" className="underline text-neutral-50">Register</a></p>
            </div>
        </section>
    );
}

export default LoginPage;