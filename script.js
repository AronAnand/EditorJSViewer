class EditorJSViewer {
    constructor() {
        this.jsonInput = document.getElementById('json-input');
        this.renderBtn = document.getElementById('render-btn');
        this.clearBtn = document.getElementById('clear-btn');
        this.output = document.getElementById('output');
        
        this.initEventListeners();
        this.initUPIModal();
    }
    
    initEventListeners() {
        this.renderBtn.addEventListener('click', () => this.renderContent());
        this.clearBtn.addEventListener('click', () => this.clearContent());
    }

    initUPIModal() {
        const supportBtn = document.getElementById('support-btn');
        const modal = document.getElementById('upi-modal');
        const closeBtn = document.querySelector('.close');
        const copyBtn = document.getElementById('copy-upi');
        const amountBtns = document.querySelectorAll('.amount-btn');
        
        // Open modal
        supportBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            this.generateQRCode();
        });
        
        // Close modal
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
        
        // Copy UPI ID
        copyBtn.addEventListener('click', () => {
            const upiId = document.getElementById('upi-id').textContent;
            navigator.clipboard.writeText(upiId).then(() => {
                copyBtn.textContent = '✅';
                copyBtn.classList.add('copied');
                setTimeout(() => {
                    copyBtn.textContent = '📋';
                    copyBtn.classList.remove('copied');
                }, 2000);
            });
        });
        
        // Amount button selection
        amountBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                amountBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                const amount = btn.dataset.amount;
                this.generateQRCode(amount);
            });
        });
    }
    
    generateQRCode(amount = '') {
        const upiId = 'aronanand@paytm'; // Replace with your UPI ID
        const payeeName = 'Aron Anand';
        const note = 'Support Editor.js Viewer';
        
        let upiURL = `upi://pay?pa=${upiId}&pn=${payeeName}&cu=INR&tn=${note}`;
        if (amount) {
            upiURL += `&am=${amount}`;
        }
        
        const qrCodeElement = document.getElementById('qr-code');
        qrCodeElement.innerHTML = ''; // Clear previous QR code
        
        QRCode.toCanvas(qrCodeElement, upiURL, {
            width: 200,
            margin: 2,
            color: {
                dark: '#2c3e50',
                light: '#ffffff'
            }
        }, (error) => {
            if (error) {
                console.error('QR Code generation failed:', error);
                qrCodeElement.innerHTML = '<p style="color: red;">QR Code generation failed</p>';
            }
        });
    }
    
    renderContent() {
        const jsonData = this.jsonInput.value.trim();
        
        if (!jsonData) {
            this.showError('Please paste your Editor.js JSON data first.');
            return;
        }
        
        try {
            const data = JSON.parse(jsonData);
            this.renderBlocks(data);
        } catch (error) {
            this.showError('Invalid JSON format. Please check your data and try again.');
            console.error('JSON parsing error:', error);
        }
    }
    
    renderBlocks(data) {
        if (!data.blocks || !Array.isArray(data.blocks)) {
            this.showError('Invalid Editor.js format. Missing blocks array.');
            return;
        }
        
        this.output.innerHTML = '';
        
        data.blocks.forEach(block => {
            const blockElement = this.createBlockElement(block);
            if (blockElement) {
                this.output.appendChild(blockElement);
            }
        });
        
        if (this.output.children.length === 0) {
            this.output.innerHTML = '<p class="no-content">No renderable content found.</p>';
        }
    }
    
    createBlockElement(block) {
        const blockDiv = document.createElement('div');
        blockDiv.className = `block block-${block.type}`;
        
        switch (block.type) {
            case 'paragraph':
                return this.createParagraph(block.data);
            
            case 'header':
                return this.createHeader(block.data);
            
            case 'list':
                return this.createList(block.data);
            
            case 'quote':
                return this.createQuote(block.data);
            
            case 'delimiter':
                return this.createDelimiter();
            
            case 'image':
                return this.createImage(block.data);
            
            case 'code':
                return this.createCode(block.data);
            
            case 'table':
                return this.createTable(block.data);
            
            case 'raw':
                return this.createRaw(block.data);
            
            case 'embed':
                return this.createEmbed(block.data);
            
            default:
                return this.createUnsupported(block);
        }
    }
    
    createParagraph(data) {
        const p = document.createElement('p');
        p.innerHTML = data.text || '';
        return p;
    }
    
    createHeader(data) {
        const level = Math.min(Math.max(data.level || 1, 1), 6);
        const header = document.createElement(`h${level}`);
        header.innerHTML = data.text || '';
        return header;
    }
    
    createList(data) {
        const listType = data.style === 'ordered' ? 'ol' : 'ul';
        const list = document.createElement(listType);
        
        if (data.items && Array.isArray(data.items)) {
            data.items.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = item || '';
                list.appendChild(li);
            });
        }
        
        return list;
    }
    
    createQuote(data) {
        const blockquote = document.createElement('blockquote');
        blockquote.innerHTML = data.text || '';
        
        if (data.caption) {
            const cite = document.createElement('cite');
            cite.innerHTML = data.caption;
            blockquote.appendChild(cite);
        }
        
        return blockquote;
    }
    
    createDelimiter() {
        const delimiter = document.createElement('div');
        delimiter.className = 'delimiter';
        delimiter.innerHTML = '* * *';
        return delimiter;
    }
    
    createImage(data) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        
        if (data.file && data.file.url) {
            img.src = data.file.url;
            img.alt = data.caption || '';
        } else if (data.url) {
            img.src = data.url;
            img.alt = data.caption || '';
        }
        
        figure.appendChild(img);
        
        if (data.caption) {
            const figcaption = document.createElement('figcaption');
            figcaption.innerHTML = data.caption;
            figure.appendChild(figcaption);
        }
        
        return figure;
    }
    
    createCode(data) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = data.code || '';
        pre.appendChild(code);
        return pre;
    }
    
    createTable(data) {
        if (!data.content || !Array.isArray(data.content)) {
            return this.createUnsupported({type: 'table', data});
        }
        
        const table = document.createElement('table');
        
        data.content.forEach((row, index) => {
            const tr = document.createElement('tr');
            
            if (Array.isArray(row)) {
                row.forEach(cell => {
                    const td = document.createElement(index === 0 && data.withHeadings ? 'th' : 'td');
                    td.innerHTML = cell || '';
                    tr.appendChild(td);
                });
            }
            
            table.appendChild(tr);
        });
        
        return table;
    }
    
    createRaw(data) {
        const div = document.createElement('div');
        div.className = 'raw-html';
        div.innerHTML = data.html || '';
        return div;
    }
    
    createEmbed(data) {
        const div = document.createElement('div');
        div.className = 'embed';
        
        if (data.embed) {
            div.innerHTML = data.embed;
        } else if (data.source) {
            const iframe = document.createElement('iframe');
            iframe.src = data.source;
            iframe.width = data.width || '100%';
            iframe.height = data.height || '315';
            div.appendChild(iframe);
        }
        
        if (data.caption) {
            const caption = document.createElement('p');
            caption.className = 'embed-caption';
            caption.innerHTML = data.caption;
            div.appendChild(caption);
        }
        
        return div;
    }
    
    createUnsupported(block) {
        const div = document.createElement('div');
        div.className = 'unsupported-block';
        div.innerHTML = `<p><strong>Unsupported block type:</strong> ${block.type}</p>
                        <pre><code>${JSON.stringify(block, null, 2)}</code></pre>`;
        return div;
    }
    
    clearContent() {
        this.jsonInput.value = '';
        this.output.innerHTML = '';
    }
    
    showError(message) {
        this.output.innerHTML = `<div class="error">${message}</div>`;
    }
}

// Initialize the viewer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new EditorJSViewer();
});