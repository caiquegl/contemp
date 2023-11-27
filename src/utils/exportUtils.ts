// exportUtils.ts

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { replaceNameToUrl } from '../utils/replaceNameToUrl'

export const exportPDF = (list: any[]) => {
  const pdf = new jsPDF();
  
  // Adiciona o conteúdo da tabela no PDF
  const columns = ['Ordem', 'Nome', 'Categoria', 'Url'];
  const data = list.map(product => [product.order, product.name, product.category.name, `https://contemp.com.br/produto/${replaceNameToUrl(product.name).toLowerCase().replaceAll(' ', '_')}`]);

  pdf.autoTable({
    head: [columns],
    body: data,
    theme: 'grid',
    styles: { cellPadding: 2, fontSize: 10 },
    margin: { top: 20 },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 40 },
      2: { cellWidth: 40 },
      3: { cellWidth: 80 },
    },
    bodyStyles: { minCellHeight: 10 },
    startY: pdf.autoTable.previous.finalY + 10,
    pageBreak: 'auto',
    orientation: 'landscape',
    headStyles: { fillColor: [182, 0, 5], textColor: [255, 255, 255] },
    didDrawPage: (data) => {
      const pageCount = pdf.internal.getNumberOfPages();
      pdf.text(`Página ${data.pageNumber} de ${pageCount}`, data.settings.margin.left, pdf.internal.pageSize.height - 10);
    },
  });
  
  // Adiciona informações no rodapé
  const date = new Date();
  const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const timeString = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  const user = 'Nome do Usuário'; // Substitua pelo nome do usuário real

  const footerData = [
    ['Usuário:', user],
    ['Data:', dateString],
    ['Hora:', timeString],
  ];

  // Adiciona a tabela do rodapé ao PDF
  pdf.autoTable({
    startY: pdf.internal.pageSize.height - 20,
    head: [],
    body: footerData,
    theme: 'grid',
    didDrawPage: (data) => {
      const pageCount = pdf.internal.getNumberOfPages();
      pdf.text(`Página ${data.pageNumber} de ${pageCount}`, data.settings.margin.left, pdf.internal.pageSize.height - 10);
    },
  });

  // Salva o arquivo PDF
  pdf.save('produtos-contemp.pdf');
};
