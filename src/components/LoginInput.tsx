import { LoginPayload } from "../../utils/api";
import useInput from "../hooks/useInput";

function LoginInput({ login }: {login: (payload: LoginPayload) => void}) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    
    return (
        <form className="max-w-md mx-auto rounded-lg shadow-lg">
            <label htmlFor="email" className="text-neutral-700">Email</label>
            <input type="text" placeholder="Email" value={email} onChange={onEmailChange} className="bg-neutral-800 placeholder-neutral-500 text-neutral-300 block w-full px-4 py-2 rounded-md mb-3" />
            <label htmlFor="password" className="text-neutral-700">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} className="bg-neutral-800 placeholder-neutral-500 text-neutral-300 block w-full px-4 py-2 rounded-md mb-3" />
            <button className="bg-neutral-700 text-neutral-300 hover:bg-neutral-600 w-full px-4 py-2 rounded-md" type="submit" onClick={() => login({ email, password })}>Login</button>
        </form>
    );
}

export default LoginInput;