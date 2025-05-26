import useInput from "../hooks/useInput";
import { useState } from "react";

function ThreadInput({onAddThread}: {onAddThread: (title: string, body: string, category: string) => void}) {
    const [title, onTitleChange] = useInput('');
    const [category, onCategoryChange] = useInput('');
    const [body, setBody] = useState('');

    function onSubmit() {
        if (body.trim()) {
            onAddThread(title, body, category);
        }   
    }

    function onBodyChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setBody(event.target.value);
    }

    return (
        <div className="flex flex-col max-w-lg gap-2 mx-auto bg-neutral-800 p-4 rounded-lg">
            <input type="text" placeholder="Title" value={title} onChange={onTitleChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md" />
            <input type="text" placeholder="Category" value={category} onChange={onCategoryChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md" />
            <textarea placeholder="Body" value={body} onChange={onBodyChange} className="bg-neutral-700 placeholder-neutral-400 text-neutral-300 block w-full px-4 py-2 rounded-md"></textarea>
            <button type="submit" onClick={onSubmit} className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 w-full px-4 py-2 rounded-md">Add Thread</button>
        </div>
    );
}

export default ThreadInput;