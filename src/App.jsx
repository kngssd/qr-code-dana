// src App.jsx
import React from "react";
import QRCode from "qrcode";
import "./index.css";

export default function App() {
    const [textLink, setTextLink] = React.useState("");
    const [historicQrCodes, setHistoricQrCodes] = React.useState([]);

    function typeTextLink(event) {
        setTextLink(event.target.value);
    }

    function generateQrCode() {
        if (textLink.trim() == "") return;

        return QRCode.toDataURL(
            textLink,
            { errorCorrectionLevel: "H" },
            (err, url) => {
                if (err) {
                    console.error(err);
                    return;
                }

                setHistoricQrCodes((historicQrCodes) => {
                    const latestFiveQrCodes = [
                        { textLink, url },
                        ...historicQrCodes,
                    ];
                    return latestFiveQrCodes.slice(0, 5);
                });
                setTextLink("");
            },
        );
    }

    return (
        <div className="style">
            <h1>QR Code Generator</h1>
            <input
                type="text"
                value={textLink}
                onChange={typeTextLink}
                placeholder="Input link"
            />
            <button onClick={generateQrCode}>Generate QR</button>
            <h2>Last 5 QR Codes</h2>
            {history.length > 0 &&
                historicQrCodes.map((item, index) => (
                    <div key={index}>
                        <img src={item.url} alt={`QR code for ${item.text}`} />
                        <p>{item.text}</p>
                    </div>
                ))}
        </div>
    );
}
