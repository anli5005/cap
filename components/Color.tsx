
export interface ColorProps {
    index: number;
    color: string;
    editColor: (newColor: string) => void;
    deleteColor: () => void;
}

export default function LiterallyEverything({ index, color, editColor, deleteColor, }: ColorProps) {

    return <div className="text-center" key={index}>
        <span className="mr-1 w-20 inline-block">Color {index + 1}:</span>
        <input className="h-12 align-middle" type="color" value={color} onChange={e => editColor(e.target.value)} />
        <button className="ml-1 text-red-500 w-20 inline-block" type="button" onClick={deleteColor}>
            Remove
        </button>
    </div>;
}