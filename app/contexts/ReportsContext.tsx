"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { createContext, useContext, useRef, useState } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
	const [reportsData, setReportsData] = useState({});
	const [loading, setLoading] = useState({});
	const contentRef = useRef<HTMLDivElement>(null);
	const downloadPDF = () => {
		const input = contentRef.current;
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
			const imgX = (pdfWidth - imgWidth * ratio) / 2;
			const imgY = (pdfHeight - imgHeight * ratio) / 2;
			pdf.addImage(imgData, "PNG", 1, 1, imgX, imgY);
			pdf.save("Diet-plan.pdf");
		});
	};

	const one = () => {
		const input = contentRef.current;

		const originalHeight = input.style.height;
		const originalOverflow = input.style.overflow;

		input.style.height = "auto";
		input.style.overflow = "visible";

		html2canvas(input, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const imgProps = pdf.getImageProperties(imgData);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
			const bufferX = 10;
			const bufferY = 5;
			let pageHeight =
				pdf.internal.pageSize.getHeight() - bufferY * 2
			let heightLeft = pdfHeight;

			let position = 0;

			pdf.addImage(
				imgData,
				"PNG",
				bufferX,
				position + bufferY,
				pdfWidth - bufferX * 2,
				pdfHeight - bufferY * 2,
			);
			heightLeft -= pageHeight;

			while (heightLeft >= 0) {
				position = heightLeft - pdfHeight;
				pdf.addPage();
				pdf.addImage(
					imgData,
					"PNG",
					bufferX,
					position + bufferY,
					pdfWidth - bufferX * 2,
					pdfHeight - bufferY * 2,
				);
				heightLeft -= pageHeight;
			}

			input.style.height = originalHeight;
			input.style.overflow = originalOverflow;

			pdf.save("download.pdf");
		});
	};

	const handleDownloadPDF = () => {
		const input = contentRef.current;
		const originalHeight = input.style.height;
		const originalOverflow = input.style.overflow;
		input.style.height = "auto";
		input.style.overflow = "visible";

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4", true);
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const margin = 30;
			const imgWidth = canvas.width;
			const imgHeight = canvas.height;
			const ratio = pdfWidth / imgWidth;
			const scaledImgHeight = imgHeight * ratio;

			let yPosition = 0;
			let pageNumber = 1;

			while (yPosition < scaledImgHeight) {
				const remainingHeight = scaledImgHeight - yPosition;
				const pageHeight = Math.min(remainingHeight, pdfHeight - 2 * margin);

				// Create a temporary canvas to hold the current page content
				const tempCanvas = document.createElement("canvas");
				tempCanvas.width = canvas.width;
				tempCanvas.height = pageHeight / ratio; // Adjust height for the scaled image
				const tempContext = tempCanvas.getContext("2d");

				// Draw the current portion of the image onto the temporary canvas
				tempContext.drawImage(
					canvas,
					0,
					yPosition,
					canvas.width,
					pageHeight,
					0,
					0,
					canvas.width,
					pageHeight / ratio,
				);

				// Get the data URL of the temporary canvas
				const tempImgData = tempCanvas.toDataURL("image/png");

				// Add the current portion to the PDF
				pdf.addImage(
					tempImgData,
					"PNG",
					0,
					margin,
					pdfWidth,
					pdfHeight - 2 * margin, // Adjust to fit within page margins
					null,
					"FAST",
				);

				yPosition += pageHeight;

				if (yPosition < scaledImgHeight) {
					pdf.addPage();
				}
			}

			pdf.save("invoice.pdf");
			input.style.height = originalHeight;
			input.style.overflow = originalOverflow;
		});
	};

	const generatePDF = () => {
		const input = contentRef.current;

		// Save original styles
		const originalHeight = input.style.height;
		const originalOverflow = input.style.overflow;

		// Set styles for rendering
		input.style.height = "auto";
		input.style.overflow = "visible";

		// Use html2canvas to capture the content
		html2canvas(input, { scale: 2 }).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("p", "mm", "a4");
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const bufferX = 10; // Left and right padding
			const bufferY = 10; // Top and bottom padding
			const imgProps = pdf.getImageProperties(imgData);
			const imgWidth = pdfWidth - 2 * bufferX;
			const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

			let heightLeft = imgHeight;
			let position = 0;

			// Add the first page
			pdf.addImage(
				imgData,
				"PNG",
				bufferX,
				bufferY,
				imgWidth,
				imgHeight > pdfHeight - 2 * bufferY
					? pdfHeight - 2 * bufferY
					: imgHeight,
			);
			heightLeft -= pdfHeight - 2 * bufferY;

			// Add additional pages as needed
			while (heightLeft > 0) {
				pdf.addPage();
				position = imgHeight - heightLeft;
				pdf.addImage(
					imgData,
					"PNG",
					bufferX,
					-position + bufferY,
					imgWidth,
					heightLeft > pdfHeight - 2 * bufferY
						? pdfHeight - 2 * bufferY
						: heightLeft,
				);
				heightLeft -= pdfHeight - 2 * bufferY;
			}

			// Restore original styles
			input.style.height = originalHeight;
			input.style.overflow = originalOverflow;

			// Save the PDF
			pdf.save("download.pdf");
		});
	};

	return (
		<ReportsContext.Provider
			value={{
				reportsData,
				setReportsData,
				loading,
				setLoading,
				contentRef,
				generatePDF,
				handleDownloadPDF,
				downloadPDF,
				one
			}}
		>
			{children}
		</ReportsContext.Provider>
	);
};

export const useReports = () => useContext(ReportsContext);
