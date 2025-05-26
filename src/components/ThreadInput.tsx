import useInput from "../hooks/useInput";
import { useState } from "react";
import { useSelector } from "react-redux";

function ThreadInput({onAddThread}: {onAddThread: (title: string, body: string, category: string) => void}) {
    const authUser = useSelector((state: any) => state.authUser);
    const [title, onTitleChange] = useInput('');
    const [category, onCategoryChange] = useInput('');
    const [body, setBody] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function onSubmit() {
        if (!authUser) {
            setErrorMessage(
                "Please sign in first"
            );
            return;
        }
        if (body.trim()) {
            onAddThread(title, body, category);
        }   
    }

    function onBodyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }

    const closeModal = () => {
        setErrorMessage(null);
    };

    return (
        <div className="flex flex-col max-w-lg gap-2 mx-auto bg-neutral-800 p-4 rounded-lg">
            <input type="text" placeholder="Title" value={title} onChange={onTitleChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md" />
            {errorMessage && (
                <div className="fixed top-0 left-0 w-full h-full bg-neutral-900/50 flex justify-center items-center">
                    <div className="bg-neutral-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold text-neutral-200">Error</h2>
                            <button onClick={closeModal} className="text-neutral-400 hover:text-neutral-200">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-red-500">{errorMessage}</p>
                    </div>
                </div>
            )}
            <input type="text" placeholder="Category" value={category} onChange={onCategoryChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md" />
            <textarea placeholder="Body" value={body} onChange={onBodyChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md"></textarea>
            <button type="submit" onClick={onSubmit} className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 w-full px-4 py-2 rounded-md">Add Thread</button>
        </div>
    );
}

export default ThreadInput;