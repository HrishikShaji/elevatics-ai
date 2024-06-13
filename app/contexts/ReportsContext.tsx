"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { createContext, useContext, useRef, useState } from "react";

const ReportsContext = createContext();

export const ReportsProvider = ({ children }) => {
	const [reportsData, setReportsData] = useState({});
	const [loading, setLoading] = useState({});
	const contentRef = useRef<HTMLDivElement>(null);

	const one = (input: HTMLDivElement) => {
		if (input) {
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
				let pageHeight = pdf.internal.pageSize.getHeight() - bufferY * 2;
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

		}
	};

	return (
		<ReportsContext.Provider
			value={{
				reportsData,
				setReportsData,
				loading,
				setLoading,
				contentRef,
				one,
			}}
		>
			{children}
		</ReportsContext.Provider>
	);
};

export const useReports = () => useContext(ReportsContext);
