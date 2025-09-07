const VolumeBar = ({ volume, setVolume, max = 5, step = 1 }) => {
    const percentage = (volume / max) * 100;

    const handleChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    return (
        <div className="volume-slider-container">
            <div className="volume-header">
                <span className="volume-value">{volume.toFixed(1)}</span>
            </div>

            <input
                type="range"
                min="0"
                max={max}
                step={step}
                value={volume}
                onChange={handleChange}
                className="volume-slider"
                style={{
                    background: `linear-gradient(to right, var(--color-moss) 0%, var(--color-moss) ${percentage}%, var(--color-beige-light) ${percentage}%, var(--color-beige-light) 100%)`
                }}
            />

            <div className="volume-labels">
                <span>quiet</span>
                <span>moderate</span>
                <span>loud</span>
            </div>
        </div>
    );
};

export default VolumeBar;