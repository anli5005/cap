import { presets } from "presets";
import { useEffect, useState } from "react";
import { Style } from "typings";

export default function LiterallyEverything() {
    const [preset, setPreset] = useState<number | null>(null);
    const [color, setColor] = useState<string>("#000000");

    useEffect(() => {
        setPreset(null);
    }, [color]);

    return <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-4">cap</h1>
        <div className="w-full text-center flex flex-col justify-center items-center">
            <div>Select a color:</div>
            <input type="color" value={color} onChange={e => setColor(e.target.value)} />
        </div>
        <div className="w-full text-center flex flex-col justify-center items-center">
            <div>Or select a preset:</div>
            <select value={preset === null ? "none" : preset.toString()} onChange={e => setPreset(e.target.value === "none" ? null : parseInt(e.target.value))}>
                <option value="none">None</option>
                {presets.map(({ name }, index) => <option key={index} value={index}>{name}</option>)}
            </select>
        </div>
        <button onClick={async () => {
            let style: Style;
            if (preset !== null) {
                style = presets[preset].style;
            } else {
                const [_, r, g, b] = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(color)!;
                style = {
                    stops: [
                        {
                            r: parseInt(r, 16),
                            g: parseInt(g, 16),
                            b: parseInt(b, 16),
                            index: 0,
                        }
                    ]
                };
            }

            await fetch(`/api/change`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(style),
            });
        }} className="block w-full mt-4 border-blue-500 border border-b-4 rounded bg-blue-500/30 hover:bg-blue-500/50 active:bg-blue-500/70 transition-colors p-2 font-bold" type="button">
            Confirm
        </button>
    </div>;
}