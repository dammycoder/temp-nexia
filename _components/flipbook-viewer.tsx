"use client";

import * as React from "react";
import HTMLFlipBook from "react-pageflip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from  "./ui/dialog";
import { Document, Page, pdfjs } from "react-pdf";
import { DownloadIcon, DownloadCloudIcon } from 'lucide-react';


// Configure PDF.js worker - use local worker file for better reliability
// Set at module load time to ensure it's configured before any Document components render
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Fallback to local worker if CDN fails (already copied to public directory)
// Uncomment the line below and comment the line above to use local worker
// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

interface FlipbookViewerProps {
  resourceUrl?: string;
}

const FlipbookViewer: React.FC<FlipbookViewerProps> = ({ resourceUrl }) => {
  const [open, setOpen] = React.useState(false);
  const [numPages, setNumPages] = React.useState<number>(0);

  if (!resourceUrl) return null;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="mt-8">
      {/* Open Button */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="cursor-pointer  inline-flex items-center gap-2 text-nexia-dark-teal-100 border border-nexia-dark-teal-100 px-4 py-2 rounded-full font-semibold hover:bg-nexia-dark-teal-100 hover:text-white transition-colors">
            Download Resource <DownloadCloudIcon/>
          </button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent className="max-w-[90vw] h-[90vh] flex flex-col bg-white">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-nexia-dark-teal-100 text-lg font-semibold">
              Flipbook Preview
            </DialogTitle>
          </DialogHeader>

          {/* Flipbook Viewer */}
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            {open && (
              <Document
                file="https://file-examples.com/storage/fe73b0948c69079429bbc30/2017/10/file-example_PDF_1MB.pdf"
                onLoadSuccess={onDocumentLoadSuccess}
                loading={<p>Loading PDF...</p>}
              >
                {/* @ts-expect-error - react-pageflip types incomplete */}
                <HTMLFlipBook
                  width={500}
                  height={700}
                  minWidth={400}
                  maxWidth={900}
                  minHeight={500}
                  maxHeight={1200}
                  showCover
                  mobileScrollSupport
                  className="shadow-xl"
                  style={{ margin: "0 auto" }}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <div
                      key={`page_${index + 1}`}
                      className="bg-white flex justify-center items-center page"
                    >
                      <Page
                        pageNumber={index + 1}
                        width={480}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </div>
                  ))}
                </HTMLFlipBook>
              </Document>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlipbookViewer;
