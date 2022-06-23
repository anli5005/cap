import { fillSolid, gradient, presets } from "presets";
import { useEffect, useState } from "react";
import { AnimationType, NUM_LEDS, Style } from "typings";

import Color from "../components/Color";

function Preset({ selected, onSelect, name, description }: { selected: boolean, onSelect: () => void, name: string, description: string }) {
    return <button type="button" className={`w-full block border-2 ${selected ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500 text-gray-300"} rounded p-2`} onClick={() => {
        onSelect();
    }}>
        <h5 className="text-lg font-bold">{name}</h5>
        <div>{description}</div>
    </button>
}

export default function LiterallyEverything() {
    const [preset, setPreset] = useState<number | null>(null);
    const [colors, setColors] = useState<string[]>(["#0000FF"]);

    return <div className="p-4">
        <h1 className="text-3xl font-bold text-center mb-4">cap</h1>
        <div className="w-full text-center">
            <div>Select a preset:</div>
        </div>
        <div className="mt-2 mb-4 space-y-2">
            {presets.map(({ name, description }, index) => {
                return <Preset key={index} selected={preset === index} onSelect={() => setPreset(index)} name={name} description={description} />;
            })}
            <Preset selected={preset === null} onSelect={() => setPreset(null)} name="Custom" description="Barf your very own artistic choices all over my graduation cap." />
        </div>
        {preset === null && <div className="mb-4 w-full justify-center items-center flex flex-col">
            <div className="text-center mb-2">Alright then! Let's see what you've got:</div>
            {colors.map((color, index) => (
                <Color
                    {...{color, index}}
                    key={index}
                    editColor={(newColor: string) => {
                        const newColors = [...colors];
                        newColors.splice(index, 1, newColor);
                        setColors(newColors);
                    }}
                    deleteColor={() => {
                        const newColors = [...colors];
                        newColors.splice(index, 1);
                        setColors(newColors);
                    }}
                    />
                
            ))}
            <button className="text-blue-500 text-center mt-3 p-3 rounded bg-slate-800" onClick={() => {
                setColors([...colors, colors.length === 0 ? "#0000FF" : colors[colors.length - 1]]);
            }}>
                Add Color
            </button>
            {/* <button className="text-blue-500 text-center mt-2" onClick={() => {
                setAnimationType((animationType + 1) % types.length);
            }}>
                Animation Type: {types[animationType]}
            </button> */}
        </div>}
        <button onClick={async () => {
            let style: Style;
            if (preset !== null) {
                style = presets[preset].style;
            } else {
                const rgb = colors.map(color => {
                    const [_, r, g, b] = /^#([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})([0-9A-Fa-f]{2})$/.exec(color)!;
                    return {r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16)};
                });

                style = {
                    stops: gradient(rgb),
                };

                /* if (animationType === 1) {
                    style.animation = {
                        type: AnimationType.LINEAR,
                        duration: 2000,
                        bounce: false,
                    };
                } */
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
        <div className="mt-2 text-white/70 text-center text-sm">
            A thing by <a href="https://anli.dev" className="underline">Anthony Li</a>. Huge props to <a href="https://github.com/Blckbrry-Pi" className="underline" target="_blank" rel="noopener noreferrer">Sky Calaman</a> for making this hacky piece of code less bad.
        </div>
    </div>;
}