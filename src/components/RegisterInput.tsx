import { RegisterPayload } from "../../utils/api";
import useInput from "../hooks/useInput";

function RegisterInput({ register }: { register: (payload: RegisterPayload) => void }) {
    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    return (
        <form>
            <input type="text" value={name} onChange={onNameChange} placeholder="Name" />
            <input type="email" value={email} onChange={onEmailChange} placeholder="Email" />
            <input type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
            <button type="button" onClick={() => register({ name, email, password })}>Register</button>
        </form>
    );
}

export default RegisterInput;