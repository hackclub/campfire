import React, { useState, useRef } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Download, Upload, RotateCw, ZoomIn } from 'lucide-react';
import { saveAs } from 'file-saver';
import { CampfireFrame } from './CampfireFrame';

interface CampfireEvent {
    eventName: string;
    city: string;
}

interface PhotoEditorProps {
    initialCampfires: CampfireEvent[];
}

export const PhotoEditor: React.FC<PhotoEditorProps> = ({ initialCampfires }) => {
    const [image, setImage] = useState<File | string | null>(null);
    const [scale, setScale] = useState<number>(1.2);
    const [rotate, setRotate] = useState<number>(0);
    const [cityName, setCityName] = useState<string>('');

    // Sort alphabetically by eventName
    const campfires = React.useMemo(() => {
        return initialCampfires.sort((a, b) =>
            (a.eventName || '').localeCompare(b.eventName || '')
        );
    }, [initialCampfires]);

    const editorRef = useRef<AvatarEditor>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleDownload = async () => {
        if (!editorRef.current) return;

        // 1. Get the image from the editor
        const canvas = editorRef.current.getImageScaledToCanvas();

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = canvas.width;
        finalCanvas.height = canvas.height;
        const ctx = finalCanvas.getContext('2d');
        if (!ctx) return;

        // 2. Draw the User Photo
        ctx.drawImage(canvas, 0, 0);

        const w = finalCanvas.width;
        const h = finalCanvas.height;

        // Helper to load images with error handling (returns null on failure)
        const loadImage = (src: string): Promise<HTMLImageElement | null> => {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = () => {
                    console.warn(`Failed to load asset: ${src}`);
                    resolve(null);
                };
                img.src = src;
            });
        };

        try {
            // 3. Load Watermark
            const watermarkImg = await loadImage('/watermark.png');

            if (watermarkImg) {
                // 4. Draw Watermark
                ctx.drawImage(watermarkImg, 0, 0, w, h);
            }

            // 5. Draw Text - Bottom Right
            const rightMargin = w * 0.10;
            const bottomMargin = h * 0.14;

            ctx.save();
            ctx.translate(w - rightMargin, h - bottomMargin);
            ctx.rotate(-6 * Math.PI / 180); // -6 degrees rotation
            ctx.textAlign = 'right';

            // Shadow Settings (Matches user request)
            // Opacity 77%, Offset 4.7px (approx 3.3px x/y), Radius 0
            ctx.shadowColor = 'rgba(0,0,0,0.77)';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 3.3;
            ctx.shadowOffsetY = 3.3;

            // City Name (Bottom Line)
            ctx.fillStyle = 'white';
            const cityFontSize = w * 0.08;
            // Use 'DREAM PLANNER' which is correct font family name in astro
            ctx.font = `${cityFontSize}px "DREAM PLANNER", sans-serif`;
            const cityText = (cityName || 'YOUR CITY').toUpperCase();
            ctx.fillText(cityText, 0, 0);

            // "CAMPFIRE" (Top Line)
            const campfireFontSize = w * 0.12;
            ctx.font = `${campfireFontSize}px "DREAM PLANNER", sans-serif`;
            // Move up - Reduced spacing to match tight line height
            ctx.fillText("CAMPFIRE", 0, -cityFontSize * 0.85);

            ctx.restore();

            // 6. Save
            finalCanvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, `campfire-frame-${cityName || 'hackclub'}.png`);
                }
            });

        } catch (error) {
            console.error("Failed to load assets:", error);
            alert("Failed to load watermark. Please check if watermark.png exists in /public.");
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto p-4">

            {/* Editor Area */}
            {/* Editor Area */}
            <div className="relative border-[6px] border-white shadow-2xl bg-stone-100 overflow-hidden rounded-2xl w-full max-w-[500px] aspect-square mx-auto">
                {!image && (
                    <div className="absolute inset-0 flex items-center justify-center z-0 bg-stone-100">
                        <div className="text-center p-8 border-4 border-dashed border-stone-300 rounded-3xl">
                            <Upload size={64} className="mx-auto mb-4 text-campfire-orange/50" />
                            <p className="dream-font text-3xl text-stone-400 uppercase tracking-wide">
                                Upload Photo<br />To Begin
                            </p>
                        </div>
                    </div>
                )}

                <AvatarEditor
                    ref={editorRef}
                    image={image || ''}
                    width={500}
                    height={500}
                    border={0}
                    scale={scale}
                    rotate={rotate}
                    className="bg-gray-900"
                    style={{ width: '100%', height: '100%' }}
                />

                {/* Visual Overlay */}
                <CampfireFrame cityName={cityName} />
            </div>

            {/* Controls */}
            <div className="w-full campfire-card p-6 space-y-6">

                {/* File Input */}
                <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer bg-white hover:bg-gray-50 transition px-4 py-4 rounded-xl flex items-center justify-center gap-3 border border-stone-200 shadow-sm group active:translate-y-0.5 active:shadow-none">
                        <Upload size={24} className="text-campfire-orange group-hover:scale-110 transition-transform" />
                        <span className="dream-font text-2xl text-stone-700 pt-1">CHOOSE PHOTO</span>
                        <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                    </label>
                </div>

                {/* Sliders */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <ZoomIn size={24} className="text-stone-400" />
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.01"
                            value={scale}
                            onChange={(e) => setScale(parseFloat(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-campfire-orange"
                        />
                    </div>

                    <div className="flex items-center gap-4 bg-stone-50 p-3 rounded-xl border border-stone-100">
                        <RotateCw size={24} className="text-stone-400" />
                        <input
                            type="range"
                            min="0"
                            max="360"
                            step="1"
                            value={rotate}
                            onChange={(e) => setRotate(parseFloat(e.target.value))}
                            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-campfire-orange"
                        />
                    </div>
                </div>

                {/* City Selection Dropdown */}
                <div className="space-y-2">
                    <label className="dream-font text-2xl text-stone-700 ml-1">CHOOSE YOUR CAMPFIRE</label>
                    <div className="relative">
                        <select
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                            className="w-full campfire-input px-4 py-3 text-stone-700 focus:ring-2 focus:ring-campfire-orange/20 focus:border-campfire-orange outline-none transition appearance-none cursor-pointer text-lg font-medium disabled:opacity-50"
                        >
                            <option value="" disabled>
                                Select a location...
                            </option>
                            {campfires.map((campfire, idx) => (
                                <option key={idx} value={campfire.eventName}>
                                    {campfire.eventName}
                                    {campfire.city && campfire.city !== campfire.eventName
                                        ? ` (${campfire.city})`
                                        : ''}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                            ▼
                        </div>
                    </div>
                </div>

                {/* Download Button */}
                <button
                    onClick={handleDownload}
                    disabled={!image}
                    className="w-full campfire-btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:border-b-0 disabled:translate-y-1 font-bold py-4 rounded-xl flex items-center justify-center gap-3"
                >
                    <Download size={28} />
                    <span className="dream-font text-3xl pt-1">DOWNLOAD FRAME</span>
                </button>
            </div>

        </div >
    );
};
