import React, { useState, useMemo } from 'react';
import { 
  calculateEMI, 
  calculateTotalRepayment, 
  calculateInflationAdjustedCost, 
  calculateOpportunityCost, 
  calculateTaxSavings80E, 
  calculateStressIndex,
  getNetTrueCost,
  generateVerdict,
  buildAmortizationSchedule
} from '../logic/financial';
import { colleges } from '../data/colleges';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Timeline from './Timeline';
import ScenarioModal from './ScenarioModal';
import { DonutChart, AmortizationBarChart, StressGauge } from './Charts';
import Verdict from './Verdict';
import PrepaymentSimulator from './PrepaymentSimulator';

const Dashboard = ({ data, onBack, user }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const selectedCollege = colleges.find(c => c.id === parseInt(data.collegeId));
  
  const emi = calculateEMI(data.loanAmount, data.interestRate, data.tenure);
  const totalRepayment = calculateTotalRepayment(emi, data.tenure);
  const totalInterest = totalRepayment - data.loanAmount;
  const inflationAdjusted = calculateInflationAdjustedCost(totalRepayment, data.tenure, data.inflationRate);
  const opportunityCost = calculateOpportunityCost(emi, data.tenure, data.marketReturn);
  const taxSavings = calculateTaxSavings80E(totalInterest);
  const netTrueCost = getNetTrueCost(totalRepayment, taxSavings);
  const stressIndex = calculateStressIndex(emi, selectedCollege?.median_salary);
  const emiToIncomePercent = selectedCollege?.median_salary ? ((emi / (selectedCollege.median_salary / 12)) * 100) : 0;

  const verdictData = useMemo(() => generateVerdict({
    stressIndex, emiToIncomePercent, opportunityCost, totalInterest,
    loanAmount: data.loanAmount, tenure: data.tenure
  }), [stressIndex, emiToIncomePercent, opportunityCost, totalInterest, data.loanAmount, data.tenure]);

  const amortizationSchedule = useMemo(() => buildAmortizationSchedule(data.loanAmount, data.interestRate, data.tenure), [data.loanAmount, data.interestRate, data.tenure]);

  const formatCurrency = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  const handleShare = () => {
    const params = new URLSearchParams({
      la: data.loanAmount, ir: data.interestRate, t: data.tenure,
      c: data.collegeId, inf: data.inflationRate, mr: data.marketReturn
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    }).catch(() => {
      prompt('Copy this link:', url);
    });
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    // Color palette
    const sage = [95, 109, 91];
    const sageLight = [240, 243, 239];
    const sand = [178, 163, 138];
    const dark = [26, 26, 26];
    const muted = [102, 102, 102];
    const white = [255, 255, 255];
    const danger = [158, 67, 58];
    const warning = [194, 149, 69];
    const safe = [74, 93, 78];

    const stressColor = stressIndex > 60 ? danger : stressIndex > 30 ? warning : safe;
    const stressLabel = stressIndex > 60 ? 'HIGH RISK' : stressIndex > 30 ? 'MODERATE CAUTION' : 'HEALTHY ALIGNMENT';
    const reportDate = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const reportId = `TC-${Date.now().toString(36).toUpperCase()}`;

    // --- Helper: Add branded footer to every page ---
    const addFooter = () => {
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        // Divider line
        doc.setDrawColor(...sand);
        doc.setLineWidth(0.3);
        doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
        // Left: branding
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...muted);
        doc.text('TrueCost AI — Financial Truth Audit', margin, pageHeight - 12);
        // Center: report ID
        doc.text(reportId, pageWidth / 2, pageHeight - 12, { align: 'center' });
        // Right: page number
        doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin, pageHeight - 12, { align: 'right' });
      }
    };

    // ======================================================
    // PAGE 1: COVER PAGE
    // ======================================================
    // Full-page sage background block (top 55%)
    doc.setFillColor(...sage);
    doc.rect(0, 0, pageWidth, pageHeight * 0.55, 'F');

    // Brand mark
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text('TRUECOST', margin, 30);
    doc.setFont('helvetica', 'normal');
    doc.text(' AI', margin + doc.getTextWidth('TRUECOST'), 30);

    // Main title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(36);
    doc.text('Financial Truth', margin, 75);
    doc.text('Audit Report', margin, 92);

    // Divider
    doc.setDrawColor(...white);
    doc.setLineWidth(0.5);
    doc.line(margin, 102, margin + 50, 102);

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(selectedCollege?.name || 'Institution Analysis', margin, 116);
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255, 180);
    doc.text(selectedCollege?.degree || '', margin, 126);

    // Cover metadata block
    const metaY = pageHeight * 0.55 + 25;
    doc.setTextColor(...dark);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('REPORT DATE', margin, metaY);
    doc.text('REPORT ID', margin + 55, metaY);
    doc.text('LOAN PRINCIPAL', margin + 110, metaY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(reportDate, margin, metaY + 8);
    doc.text(reportId, margin + 55, metaY + 8);
    doc.text(formatCurrency(data.loanAmount), margin + 110, metaY + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('TENURE', margin, metaY + 25);
    doc.text('INTEREST RATE', margin + 55, metaY + 25);
    doc.text('MONTHLY EMI', margin + 110, metaY + 25);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text(`${data.tenure} Years`, margin, metaY + 33);
    doc.text(`${data.interestRate}% p.a.`, margin + 55, metaY + 33);
    doc.text(formatCurrency(emi), margin + 110, metaY + 33);

    // Stress index badge on cover
    const badgeY = metaY + 55;
    const badgeWidth = contentWidth;
    doc.setFillColor(...stressColor);
    doc.roundedRect(margin, badgeY, badgeWidth, 28, 3, 3, 'F');
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`STRESS INDEX: ${Math.round(stressIndex)} / 100`, margin + 10, badgeY + 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(stressLabel, margin + 10, badgeY + 22);

    // Confidentiality notice
    doc.setTextColor(...muted);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7);
    doc.text('This report is generated by TrueCost AI for educational analysis purposes. Data is indicative and based on publicly available information.', margin, pageHeight - 25);

    // ======================================================
    // PAGE 2: EXECUTIVE SUMMARY & INSTITUTIONAL PROFILE
    // ======================================================
    doc.addPage();
    let y = 25;

    // Section header helper
    const sectionHeader = (num, title, yPos) => {
      doc.setFillColor(...sageLight);
      doc.rect(0, yPos - 7, pageWidth, 14, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...sage);
      doc.text(`${num}.`, margin, yPos);
      doc.setTextColor(...dark);
      doc.text(title, margin + 10, yPos);
      doc.setDrawColor(...sage);
      doc.setLineWidth(0.4);
      doc.line(margin, yPos + 4, pageWidth - margin, yPos + 4);
      return yPos + 16;
    };

    // Metric box helper
    const metricBox = (label, value, xPos, yPos, width, highlight = false) => {
      if (highlight) {
        doc.setFillColor(...sage);
        doc.roundedRect(xPos, yPos, width, 30, 2, 2, 'F');
        doc.setTextColor(...white);
      } else {
        doc.setFillColor(248, 247, 245);
        doc.roundedRect(xPos, yPos, width, 30, 2, 2, 'F');
        doc.setTextColor(...dark);
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(highlight ? [220, 230, 220] : muted);
      doc.text(label, xPos + 6, yPos + 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(highlight ? white : dark);
      doc.text(value, xPos + 6, yPos + 23);
    };

    y = sectionHeader('01', 'EXECUTIVE SUMMARY', y);

    // Key metrics row 1
    metricBox('MONTHLY EMI', formatCurrency(emi), margin, y, 52);
    metricBox('TOTAL REPAYMENT', formatCurrency(totalRepayment), margin + 56, y, 55);
    metricBox('TOTAL INTEREST', formatCurrency(totalInterest), margin + 115, y, 55, true);
    y += 36;

    // Key metrics row 2
    metricBox('REAL COST (NPV)', formatCurrency(inflationAdjusted), margin, y, 52);
    metricBox('OPPORTUNITY COST', formatCurrency(opportunityCost), margin + 56, y, 55);
    metricBox('NET TRUE COST', formatCurrency(netTrueCost), margin + 115, y, 55, true);
    y += 42;

    // Tax savings callout
    doc.setFillColor(245, 248, 245);
    doc.roundedRect(margin, y, contentWidth, 22, 2, 2, 'F');
    doc.setDrawColor(...sage);
    doc.setLineWidth(0.5);
    doc.line(margin, y, margin, y + 22);
    doc.setTextColor(...sage);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('SEC 80E TAX SAVINGS', margin + 8, y + 8);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...dark);
    doc.text(`You may save up to ${formatCurrency(taxSavings)} in taxes via interest deduction under Section 80E.`, margin + 8, y + 17);
    y += 32;

    // Institutional Profile
    y = sectionHeader('02', 'INSTITUTIONAL PROFILE', y);

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      theme: 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: { top: 5, bottom: 5, left: 8, right: 8 },
        lineColor: [229, 226, 223],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: sage,
        textColor: white,
        fontStyle: 'bold',
        fontSize: 8,
      },
      alternateRowStyles: {
        fillColor: [252, 251, 249],
      },
      head: [['Parameter', 'Details']],
      body: [
        ['Institution', selectedCollege?.name || 'N/A'],
        ['Degree Program', selectedCollege?.degree || 'N/A'],
        ['Location', selectedCollege?.location || 'N/A'],
        ['Institution Tier', `Tier ${selectedCollege?.tier || 'N/A'}`],
        ['Approximate Fees', formatCurrency(selectedCollege?.fees_approx || 0)],
        ['Median Graduate Salary', formatCurrency(selectedCollege?.median_salary || 0)],
        ['Monthly Take-Home (est.)', formatCurrency((selectedCollege?.median_salary || 0) / 12)],
      ],
    });

    y = doc.lastAutoTable.finalY + 15;

    // EMI to Income analysis
    const emiToIncome = selectedCollege?.median_salary ? ((emi / (selectedCollege.median_salary / 12)) * 100).toFixed(1) : 'N/A';
    doc.setFillColor(...(stressIndex > 60 ? [253, 244, 242] : stressIndex > 30 ? [255, 249, 237] : [245, 248, 245]));
    doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'F');
    doc.setDrawColor(...stressColor);
    doc.setLineWidth(0.6);
    doc.line(margin, y, margin, y + 28);
    doc.setTextColor(...stressColor);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('EMI-TO-INCOME RATIO', margin + 8, y + 9);
    doc.setFontSize(13);
    doc.text(`${emiToIncome}%`, margin + 8, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...muted);
    doc.text(
      stressIndex > 60 ? 'Exceeds safe threshold (>50%). High financial stress expected.' :
      stressIndex > 30 ? 'Within cautionary range (30-50%). Plan carefully.' :
      'Within safe threshold (<30%). Manageable debt load.',
      margin + 50, y + 21
    );

    // ======================================================
    // PAGE 3: AMORTIZATION SCHEDULE
    // ======================================================
    doc.addPage();
    y = 25;
    y = sectionHeader('03', 'YEAR-BY-YEAR AMORTIZATION SCHEDULE', y);

    // Build amortization data
    const monthlyRate = data.interestRate / 12 / 100;
    let balance = data.loanAmount;
    const amortizationData = [];

    for (let year = 1; year <= data.tenure; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;
      for (let month = 1; month <= 12; month++) {
        const interestPart = balance * monthlyRate;
        const principalPart = emi - interestPart;
        yearInterest += interestPart;
        yearPrincipal += principalPart;
        balance -= principalPart;
      }
      if (balance < 0) balance = 0;
      amortizationData.push([
        `Year ${year}`,
        formatCurrency(emi * 12),
        formatCurrency(yearPrincipal),
        formatCurrency(yearInterest),
        formatCurrency(balance),
        `${((yearPrincipal / (emi * 12)) * 100).toFixed(1)}%`
      ]);
    }

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      theme: 'grid',
      styles: {
        font: 'helvetica',
        fontSize: 8,
        cellPadding: { top: 4, bottom: 4, left: 5, right: 5 },
        lineColor: [229, 226, 223],
        lineWidth: 0.2,
        halign: 'right',
      },
      headStyles: {
        fillColor: sage,
        textColor: white,
        fontStyle: 'bold',
        fontSize: 7.5,
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'left', fontStyle: 'bold' },
        5: { halign: 'center' },
      },
      alternateRowStyles: {
        fillColor: [252, 251, 249],
      },
      head: [['Period', 'Annual Payment', 'Principal Paid', 'Interest Paid', 'Remaining Balance', '% Principal']],
      body: amortizationData,
      foot: [[
        'TOTAL',
        formatCurrency(emi * 12 * data.tenure),
        formatCurrency(data.loanAmount),
        formatCurrency(totalInterest),
        formatCurrency(0),
        ''
      ]],
      footStyles: {
        fillColor: dark,
        textColor: white,
        fontStyle: 'bold',
        fontSize: 8,
      },
    });

    y = doc.lastAutoTable.finalY + 12;

    // Interest vs Principal insight
    const interestPercent = ((totalInterest / totalRepayment) * 100).toFixed(1);
    doc.setFillColor(248, 247, 245);
    doc.roundedRect(margin, y, contentWidth, 30, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...sage);
    doc.text('KEY INSIGHT', margin + 8, y + 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...dark);
    doc.text(
      `${interestPercent}% of your total repayment (${formatCurrency(totalRepayment)}) goes toward interest alone.`,
      margin + 8, y + 19
    );
    doc.text(
      `This means for every ₹100 you pay, only ₹${(100 - parseFloat(interestPercent)).toFixed(0)} reduces your actual debt.`,
      margin + 8, y + 27
    );

    // ======================================================
    // PAGE 4: OPPORTUNITY COST & TIMELINE
    // ======================================================
    doc.addPage();
    y = 25;
    y = sectionHeader('04', 'OPPORTUNITY COST ANALYSIS', y);

    // Opportunity cost explanation
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    const oppText = `If instead of paying an EMI of ${formatCurrency(emi)}/month, you invested that amount in the market at an expected return of ${data.marketReturn}% p.a. over ${data.tenure} years, you would accumulate:`;
    const oppLines = doc.splitTextToSize(oppText, contentWidth - 10);
    doc.text(oppLines, margin, y);
    y += oppLines.length * 5 + 8;

    // Big opportunity cost number
    doc.setFillColor(...sage);
    doc.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F');
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text(formatCurrency(opportunityCost), margin + 12, y + 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('TOTAL WEALTH FOREGONE', margin + 12, y + 30);
    y += 45;

    // Comparison table
    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      theme: 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: { top: 6, bottom: 6, left: 10, right: 10 },
        lineColor: [229, 226, 223],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: sage,
        textColor: white,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [252, 251, 249],
      },
      head: [['Metric', 'With Loan', 'If Invested Instead']],
      body: [
        ['Monthly Outflow', formatCurrency(emi), formatCurrency(emi) + ' (SIP)'],
        ['Duration', `${data.tenure} Years`, `${data.tenure} Years`],
        ['Total Outflow', formatCurrency(totalRepayment), formatCurrency(emi * data.tenure * 12)],
        ['End Value', 'Debt Cleared (₹0)', formatCurrency(opportunityCost)],
        ['Net Financial Position', `-${formatCurrency(totalInterest)} (interest paid)`, `+${formatCurrency(opportunityCost - emi * data.tenure * 12)} (returns)`],
      ],
    });
    y = doc.lastAutoTable.finalY + 18;

    // Timeline / Journey to Liquidity
    y = sectionHeader('05', 'JOURNEY TO LIQUIDITY — TIMELINE', y);
    const currentYear = new Date().getFullYear();
    const milestones = [
      { year: currentYear, label: 'ORIGIN', desc: `EMI of ${formatCurrency(emi)} begins` },
      { year: currentYear + Math.round(data.tenure / 2), label: 'EQUILIBRIUM', desc: '50% principal amortized' },
      { year: currentYear + data.tenure, label: 'ABSOLUTION', desc: 'Debt cleared. Cashflow reclaimed.' },
      { year: currentYear + data.tenure + 5, label: 'LEGACY', desc: 'Wealth compounding accelerates' }
    ];

    const timelineStartX = margin + 10;
    const timelineWidth = contentWidth - 20;
    const dotSpacing = timelineWidth / (milestones.length - 1);

    // Timeline line
    doc.setDrawColor(...sand);
    doc.setLineWidth(1);
    doc.line(timelineStartX, y + 6, timelineStartX + timelineWidth, y + 6);

    milestones.forEach((m, i) => {
      const cx = timelineStartX + i * dotSpacing;
      // Dot
      doc.setFillColor(i < 3 ? dark : sage);
      doc.circle(cx, y + 6, 4, 'F');
      doc.setFillColor(...white);
      doc.circle(cx, y + 6, 2, 'F');
      // Year
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...dark);
      doc.text(String(m.year), cx, y + 20, { align: 'center' });
      // Label
      doc.setFontSize(7);
      doc.setTextColor(...sage);
      doc.text(m.label, cx, y + 27, { align: 'center' });
      // Description
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(...muted);
      const descLines = doc.splitTextToSize(m.desc, 38);
      doc.text(descLines, cx, y + 33, { align: 'center' });
    });
    y += 52;

    // ======================================================
    // PAGE 5: ASSUMPTIONS & DISCLAIMER
    // ======================================================
    if (y > pageHeight - 80) {
      doc.addPage();
      y = 25;
    }
    y = sectionHeader('06', 'ASSUMPTIONS & METHODOLOGY', y);

    doc.autoTable({
      startY: y,
      margin: { left: margin, right: margin },
      theme: 'plain',
      styles: {
        font: 'helvetica',
        fontSize: 9,
        cellPadding: { top: 4, bottom: 4, left: 8, right: 8 },
        lineColor: [229, 226, 223],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [248, 247, 245],
        textColor: dark,
        fontStyle: 'bold',
        fontSize: 8,
      },
      head: [['Assumption', 'Value Used']],
      body: [
        ['Inflation Rate', `${data.inflationRate}% per annum`],
        ['Expected Market Returns', `${data.marketReturn}% per annum`],
        ['Marginal Tax Rate (Sec 80E)', '20%'],
        ['EMI Calculation', 'Standard reducing balance method'],
        ['NPV Discount Factor', `Inflation rate (${data.inflationRate}%)`],
        ['Opportunity Cost Method', `Future Value of SIP at ${data.marketReturn}% CAGR`],
        ['Salary Data Source', 'Publicly reported placement statistics'],
      ],
    });

    y = doc.lastAutoTable.finalY + 12;

    // Disclaimer
    doc.setFillColor(248, 247, 245);
    doc.roundedRect(margin, y, contentWidth, 40, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...sage);
    doc.text('DISCLAIMER', margin + 8, y + 9);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...muted);
    const disclaimerText = 'This report is generated by TrueCost AI for educational and analytical purposes only. It does not constitute financial advice. All calculations are based on user-provided inputs and publicly available placement data. Actual outcomes may vary significantly based on market conditions, individual performance, policy changes, and other factors. Consult a certified financial advisor before making financial decisions. TrueCost AI assumes no liability for decisions made based on this report.';
    const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 16);
    doc.text(disclaimerLines, margin + 8, y + 16);

    // Add footers to all pages
    addFooter();

    // Save the PDF
    doc.save(`TrueCost_Audit_${selectedCollege?.name?.replace(/\s+/g, '_') || 'Report'}_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  const getIndicatorColor = (idx) => {
    if (idx < 30) return 'var(--safe)';
    if (idx < 60) return 'var(--warning)';
    return 'var(--danger)';
  };

  return (
    <div className="dashboard-wrapper container" style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <header style={{ 
        marginBottom: 'var(--spacing-lg)', 
        borderBottom: '1px solid var(--border-light)', 
        paddingBottom: 'var(--spacing-md)', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>The <span className="text-editorial">True Cost</span> Report</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Analysis for {selectedCollege?.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={handleShare} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'transparent', border: '1px solid var(--border-light)', borderRadius: '2px', cursor: 'pointer', color: 'var(--text-muted)', fontFamily: 'Inter, sans-serif' }}>📤 Share</button>
          <button className="btn-natural" onClick={onBack} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>New Analysis</button>
        </div>
      </header>

      {/* Verdict */}
      <Verdict verdictData={verdictData} />

      <div className="dashboard-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 'var(--spacing-lg)' 
      }}>
        <div className="main-content">
          {/* Charts Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
            <StressGauge value={stressIndex} />
            <DonutChart principal={data.loanAmount} interest={totalInterest} />
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 'var(--spacing-md)', 
            marginBottom: 'var(--spacing-lg)' 
          }}>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CUMULATIVE REPAYMENT</h4>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(totalRepayment)}</div>
            </div>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>REAL COST (NPV)</h4>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Instrument Serif' }}>{formatCurrency(inflationAdjusted)}</div>
            </div>
            <div className="editorial-card">
              <h4 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>TAX SAVINGS (80E)</h4>
              <div style={{ fontSize: '1.8rem', fontFamily: 'Instrument Serif', color: 'var(--safe)' }}>{formatCurrency(taxSavings)}</div>
            </div>
          </div>

          <div className="editorial-card" style={{ backgroundColor: 'var(--bg-natural)', borderStyle: 'dashed', marginBottom: 'var(--spacing-lg)' }}>
            <h4 style={{ fontSize: '0.75rem', color: 'var(--accent-earth)', marginBottom: '12px', fontWeight: '700' }}>THE OPPORTUNITY COST</h4>
            <div style={{ fontSize: '2.5rem', fontFamily: 'Instrument Serif', marginBottom: '12px', lineHeight: 1 }}>{formatCurrency(opportunityCost)}</div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              By choosing the loan over investing the monthly EMI, this is the total wealth you are opting to forego.
            </p>
          </div>

          {/* Amortization Bar Chart */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <AmortizationBarChart schedule={amortizationSchedule} />
          </div>

          {/* Prepayment Simulator */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <PrepaymentSimulator data={data} />
          </div>

          <Timeline data={data} emi={emi} />
        </div>

        <div className="sidebar">
          <div className="editorial-card" style={{ position: 'sticky', top: 'var(--spacing-md)' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 'var(--spacing-md)' }}>Decision Specs</h3>
            <div style={{ fontSize: '0.85rem', display: 'grid', gap: '12px' }}>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>INSTITUTION</div>
                <div style={{ fontWeight: '600' }}>{selectedCollege?.name}</div>
              </div>
              <div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>EXPECTED INCOME</div>
                <div style={{ fontWeight: '600' }}>{formatCurrency(selectedCollege?.median_salary / 12)} / month</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>MONTHLY OBLIGATION</div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>{formatCurrency(emi)}</div>
              </div>
              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>NET TRUE COST</div>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>{formatCurrency(netTrueCost)}</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setModalOpen(true)} style={{ padding: '10px', background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', borderRadius: '2px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                Stress Test Failure
              </button>
              <button className="btn-natural" onClick={handleDownloadReport} style={{ width: '100%', fontSize: '0.85rem' }}>
                Download Archive (PDF)
              </button>
              <button onClick={handleShare} style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid var(--accent-earth)', color: 'var(--accent-earth)', borderRadius: '2px', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Inter, sans-serif' }}>
                📤 Share Analysis
              </button>
              {user && (
                <button 
                  className="btn-natural" 
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem('token');
                      const res = await fetch('/api/auth/analysis', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(data)
                      });
                      if (res.ok) alert('Analysis saved to profile!');
                      else alert('Failed to save analysis.');
                    } catch (err) {
                      console.error(err);
                      alert('Error saving analysis.');
                    }
                  }}
                  style={{ width: '100%', fontSize: '0.85rem' }}
                >
                  Save to Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <ScenarioModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} data={data} emi={emi} />
      <div className={`toast ${toastVisible ? 'show' : ''}`}>✓ Link copied to clipboard!</div>
    </div>
  );
};

export default Dashboard;
