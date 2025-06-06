import React, { useState } from 'react';
import axios from 'axios';
import './BNS.css';

const BNS = () => {
const [bnsSection, setBnsSection] = useState('');
const [result, setResult] = useState(null);
const [error, setError] = useState('');

const handleConvert = async () => {
    try {
        const response = await axios.get(`https://legallookup-backend.vercel.app/api/allsections`, {
        params: { bns_section: bnsSection },
    });
    const data = response.data.find((section) => section.bns_section === bnsSection);
    if (data) {
        setResult(data);
        setError('');
    } else {
        setError('No matching section found');
        setResult(null);
    }
    } catch (err) {
        setError('Error fetching section data');
        setResult(null);
    }
};

return (
    <div className="bns-ipc-converter">
    <div className="converter-content">
        <h2>BNS to IPC Converter</h2>
        <div className="input-section">
        <label>Enter BNS Section:</label>
        <input
            type="text"
            value={bnsSection}
            onChange={(e) => setBnsSection(e.target.value)}
            placeholder="e.g., 317"
        />
        <button onClick={handleConvert}>Convert</button>
        </div>

        {error && <p className="error">{error}</p>}
        {result && (
        <div className="result">
            <p className="section" align='center'>
            Corresponding section to <span className="highlight ipc">BNS {result.bns_section}</span> is <span className="highlight bns">IPC {result.ipc_section}</span>
            </p>
            <h4 className="title" align='center'>Case: <span className="highlight bns">{result.title}</span></h4>
            <div className="description">
            <h4>Description:</h4><br />
            <ol>
                {result.description.map((desc, index) => (
                <li key={index}>{desc}</li>
                ))}
            </ol>
            </div>
        </div>
        )}
    </div>

    <div className="info-section-convertor">
        
        <div className="key-differences">
        <h3 className="section-title-convertor">Key Differences between IPC and BNS</h3>
        <div className="reason-cards-con">
            <div className="card-con">
            <h4 className="highlight">Offenses</h4>
            <p>The BNS retains most offenses from the IPC, adds new offenses, and removes some. Sedition is no longer an offense, but there's a new offense for acts endangering India's sovereignty, unity, and integrity.</p>
            </div>
            <div className="card-con">
            <h4 className="highlight">Punishment</h4>
            <p>The BNS introduces community service as a punishment, especially for petty offenses, whereas the IPC focused on imprisonment, fines, or the death penalty.</p>
            </div>
            <div className="card-con">
            <h4 className="highlight">Definitions</h4>
            <p>The BNS separately defines acts and omissions, while the IPC combined them.</p>
            </div>
            <div className="card-con">
            <h4 className="highlight">Procedural Norms</h4>
            <p>The BNS updates procedural norms.</p>
            </div>
            <div className="card-con">
            <h4 className="highlight">Rights of the Accused and Victims</h4>
            <p>The BNS includes provisions for the rights of both the accused and victims.</p>
            </div>
            <div className="card-con">
            <h4 className="highlight">Theft</h4>
            <p>The BNS definition of theft includes data theft and identity theft.</p>
            </div>
        </div>
        </div>
    </div>
    </div>
);
};

export default BNS;



