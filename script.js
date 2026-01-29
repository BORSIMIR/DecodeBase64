// DOM Elements
const base64Input = document.getElementById('base64Input');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const example1 = document.getElementById('example1');

// Result elements
const asciiResult = document.getElementById('asciiResult');
const fullAscii = document.getElementById('fullAscii');
const byteAnalysis = document.getElementById('byteAnalysis');
const rawBytes = document.getElementById('rawBytes');

// Statistic elements
const totalBytes = document.getElementById('totalBytes');
const nullBytes = document.getElementById('nullBytes');
const printableBytes = document.getElementById('printableBytes');
const stringLength = document.getElementById('stringLength');

// Example Base64 string
const EXAMPLE_BASE64 = "IkRlY29kZSB0aGUgQmFzZTY0Ig==";

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    // Add event listeners
    convertBtn.addEventListener('click', convertBase64);
    clearBtn.addEventListener('click', clearInput);
    example1.addEventListener('click', loadExample);
    base64Input.addEventListener('keypress', handleKeyPress);
    
    // Auto-convert example on load
    setTimeout(convertBase64, 100);
}

function loadExample(e) {
    e.preventDefault();
    base64Input.value = EXAMPLE_BASE64;
    convertBase64();
}

function clearInput(e) {
    if (e) e.preventDefault();
    base64Input.value = '';
    resetResults();
}

function handleKeyPress(e) {
    if (e.key === 'Enter') {
        convertBase64();
    }
}

function resetResults() {
    asciiResult.innerHTML = 
        '<div class="text-center text-muted"><i class="bi bi-arrow-up-circle display-6 d-block mb-2"></i>Enter a Base64 string and click Convert</div>';
    fullAscii.innerHTML = '';
    byteAnalysis.innerHTML = '<div class="text-center text-muted">No data to analyze yet</div>';
    rawBytes.innerHTML = '';
    updateStats(0, 0, 0, 0);
}

function updateStats(total, nullCount, printable, length) {
    totalBytes.textContent = total;
    nullBytes.textContent = nullCount;
    printableBytes.textContent = printable;
    stringLength.textContent = length;
}

function convertBase64() {
    const input = base64Input.value.trim();
    
    if (!input) {
        showError('Please enter a Base64 string');
        return;
    }
    
    try {
        // Decode Base64
        const binaryString = atob(input);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Process ASCII characters
        let asciiNoNulls = '';
        let fullAsciiText = '';
        let nullCount = 0;
        let printableCount = 0;
        
        for (let i = 0; i < bytes.length; i++) {
            if (bytes[i] === 0) {
                fullAsciiText += '<span class="text-danger fw-bold">·</span>';
                nullCount++;
            } else if (bytes[i] >= 32 && bytes[i] <= 126) {
                asciiNoNulls += String.fromCharCode(bytes[i]);
                fullAsciiText += String.fromCharCode(bytes[i]);
                printableCount++;
            } else {
                fullAsciiText += '<span class="text-warning">?</span>';
            }
        }
        
        // Update ASCII results
        asciiResult.innerHTML = `<span class="fs-5 fw-bold text-primary result-update">${asciiNoNulls}</span>`;
        fullAscii.innerHTML = fullAsciiText;
        
        // Process byte analysis
        let byteAnalysisHTML = '';
        let rawBytesHTML = '';
        
        for (let i = 0; i < bytes.length; i++) {
            // Display raw bytes
            const hex = bytes[i].toString(16).padStart(2, '0').toUpperCase();
            rawBytesHTML += `<span class="byte-box ${bytes[i] === 0 ? 'null-byte' : ''}">
                ${hex}
            </span>`;
            
            // Process in 4-byte groups
            if (i % 4 === 0 && i + 3 < bytes.length) {
                // Little-endian 32-bit integer conversion
                const intValue = (bytes[i]) | 
                               (bytes[i+1] << 8) | 
                               (bytes[i+2] << 16) | 
                               (bytes[i+3] << 24);
                
                // Get character representation
                let charRep = getCharRepresentation(bytes[i]);
                
                byteAnalysisHTML += `
                    <div class="mb-2 p-2 border rounded result-update">
                        <span class="position-marker">[${i.toString().padStart(3, '0')}]</span>
                        <span class="byte-box">${bytes[i].toString(16).padStart(2, '0')}</span>
                        <span class="byte-box">${bytes[i+1].toString(16).padStart(2, '0')}</span>
                        <span class="byte-box">${bytes[i+2].toString(16).padStart(2, '0')}</span>
                        <span class="byte-box">${bytes[i+3].toString(16).padStart(2, '0')}</span>
                        →
                        Integer: <span class="int-value">${intValue}</span>
                        | Char: <span class="char-value">'${charRep}'</span>
                    </div>`;
            }
        }
        
        // Update analysis results
        byteAnalysis.innerHTML = byteAnalysisHTML || 
            '<div class="text-center text-muted">No 4-byte groups found</div>';
        rawBytes.innerHTML = rawBytesHTML;
        
        // Update statistics
        updateStats(bytes.length, nullCount, printableCount, asciiNoNulls.length);
        
        // Remove animation class after animation completes
        setTimeout(() => {
            document.querySelectorAll('.result-update').forEach(el => {
                el.classList.remove('result-update');
            });
        }, 500);
        
    } catch (error) {
        showError(`Error: ${error.message}`);
        console.error('Conversion error:', error);
    }
}

function getCharRepresentation(byte) {
    if (byte >= 32 && byte <= 126) {
        return String.fromCharCode(byte);
    } else if (byte === 0) {
        return 'NULL';
    } else {
        return 'Non-printable';
    }
}

function showError(message) {
    asciiResult.innerHTML = 
        `<div class="alert alert-danger">
            <i class="bi bi-exclamation-triangle"></i> ${message}
        </div>`;
}