import React, {useState} from 'react';
import {Document, Page} from "react-pdf/dist/umd/entry.webpack";



const HelpPage = () => {
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    return (
        <div>
            <Document
                file="./manual.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
            </Document>
        </div>
    );
};

export default HelpPage;