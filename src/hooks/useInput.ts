import { useState } from "react";

function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue);

    function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    return [value, handleValueChange] as const;
}

export default useInput;