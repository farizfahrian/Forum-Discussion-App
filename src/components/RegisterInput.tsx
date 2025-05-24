import { RegisterPayload } from "../../utils/api";
import useInput from "../hooks/useInput";

function RegisterInput({ register }: { register: (payload: RegisterPayload) => void }) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    return (
        <form className="max-w-md mx-auto rounded-lg shadow-lg">
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Name" value={name} onChange={onNameChange} className="bg-neutral-800 placeholder-neutral-500 text-neutral-300 block w-full px-4 py-2 rounded-md mb-3" />
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Email" value={email} onChange={onEmailChange} className="bg-neutral-800 placeholder-neutral-500 text-neutral-300 block w-full px-4 py-2 rounded-md mb-3" />
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} className="bg-neutral-800 placeholder-neutral-500 text-neutral-300 block w-full px-4 py-2 rounded-md mb-3" />
            <button className="bg-neutral-700 text-neutral-300 hover:bg-neutral-600 w-full px-4 py-2 rounded-md" type="submit" onClick={() => register({ name, email, password })}>Register</button>
        </form>
    );
}

export default RegisterInput;