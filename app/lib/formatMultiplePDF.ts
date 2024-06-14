import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function formatMultiplePDF(htmlStrings: string[]) {
	const pdf = new jsPDF("p", "mm", "a4");

	const generatePDF = (htmlString, callback) => {
		const container = document.createElement("div");
		container.style.position = "absolute";
		container.style.left = "-9999px";
		document.body.appendChild(container);
		container.innerHTML = htmlString;

		html2canvas(container).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
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

			document.body.removeChild(container);
			callback();
		});
	};

	const processNext = (index) => {
		if (index < htmlStrings.length) {
			generatePDF(htmlStrings[index], () => processNext(index + 1));
		} else {
			pdf.save("download.pdf");
		}
	};

	processNext(0);
}
