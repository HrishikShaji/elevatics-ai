import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";

export function formatPDF(ref: RefObject<HTMLDivElement>) {
  const input = ref.current;
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
}
