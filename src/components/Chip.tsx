function Chip({ label }: { label: string }) {
    return (
        <div className="px-2 py-1 h-fit rounded-full border border-neutral-500 inline-flex justify-center items-center">
            <div className="justify-start text-neutral-50 text-sm font-medium">{label.charAt(0).toUpperCase() + label.slice(1)}</div>
        </div>
    );
}

export default Chip;