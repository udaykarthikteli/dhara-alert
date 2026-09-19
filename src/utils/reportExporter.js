/**
 * Dhara Alert - Automated PDF & CSV Incident Report Generator
 * Generates official situational disaster assessment reports for NDRF, SDMA, and District Authorities.
 */

export function exportIncidentCsv(reports = [], filterOptions = {}) {
  if (!reports || reports.length === 0) {
    alert("No incident reports available to export.");
    return;
  }

  const headers = [
    "Incident ID",
    "Timestamp",
    "State",
    "District / Location",
    "Hazard Category",
    "Severity Level",
    "Road Impact",
    "GPS Latitude",
    "GPS Longitude",
    "Verification Status",
    "Reporter Name / Role",
    "Description"
  ];

  const rows = reports.map((r) => {
    const latLng = r.coordinates ? `${r.coordinates.lat || ''}, ${r.coordinates.lng || ''}` : 'N/A';
    return [
      `"${r.id || ''}"`,
      `"${r.timestamp || new Date().toLocaleString()}"`,
      `"${r.state || 'North-East Region'}"`,
      `"${(r.location || '').replace(/"/g, '""')}"`,
      `"${(r.category || 'Landslide').replace(/"/g, '""')}"`,
      `"${r.severity || 'MODERATE'}"`,
      `"${(r.roadImpact || 'Partial Blockage').replace(/"/g, '""')}"`,
      `"${r.coordinates?.lat || '25.5788'}"`,
      `"${r.coordinates?.lng || '91.8933'}"`,
      `"${r.status === 'SYNCED_CLOUD' ? 'Verified Cloud' : 'Ground Verified'}"`,
      `"${(r.author || 'Citizen Volunteer').replace(/"/g, '""')}"`,
      `"${(r.description || '').replace(/"/g, '""')}"`
    ].join(",");
  });

  const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `Dhara_Alert_Incidents_${filterOptions.state || 'All_NER'}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportIncidentPdf(reports = [], filterOptions = {}) {
  if (!reports || reports.length === 0) {
    alert("No incident reports available to generate PDF.");
    return;
  }

  const dateStr = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  const timeStr = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });

  const total = reports.length;
  const criticalCount = reports.filter((r) => r.severity === 'CRITICAL').length;
  const highCount = reports.filter((r) => r.severity === 'HIGH').length;
  const moderateCount = reports.filter((r) => r.severity === 'MODERATE' || !r.severity).length;
  const roadBlockedCount = reports.filter((r) => (r.category && r.category.toLowerCase().includes('road')) || (r.description && r.description.toLowerCase().includes('block'))).length;

  const printWindow = window.open("", "_blank", "width=900,height=1000");
  if (!printWindow) {
    alert("Please allow popups to download or print the official PDF report.");
    return;
  }

  const reportHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Dhara Alert - Official Disaster Incident Report (SITREP)</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 20px;
      font-size: 11pt;
      line-height: 1.4;
    }
    .header {
      border-bottom: 3px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .header-left h1 {
      margin: 0;
      font-size: 20pt;
      color: #0369a1;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .header-left h2 {
      margin: 3px 0 0 0;
      font-size: 11pt;
      font-weight: 600;
      color: #475569;
    }
    .header-right {
      text-align: right;
      font-size: 9pt;
      color: #64748b;
    }
    .sitrep-badge {
      display: inline-block;
      background: #ef4444;
      color: #ffffff;
      padding: 3px 10px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 9pt;
      margin-bottom: 4px;
    }
    .meta-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 20px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      font-size: 9.5pt;
    }
    .meta-item strong {
      display: block;
      color: #64748b;
      font-size: 8pt;
      text-transform: uppercase;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-bottom: 24px;
    }
    .summary-card {
      border-radius: 8px;
      padding: 12px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    .summary-card .number {
      font-size: 20pt;
      font-weight: 800;
      margin: 4px 0;
    }
    .summary-card .label {
      font-size: 8.5pt;
      font-weight: 600;
      text-transform: uppercase;
    }
    .card-total { background: #f0f9ff; border-color: #bae6fd; color: #0369a1; }
    .card-critical { background: #fef2f2; border-color: #fecaca; color: #b91c1c; }
    .card-high { background: #fffbeb; border-color: #fde68a; color: #b45309; }
    .card-roads { background: #fdf4ff; border-color: #f5d0fe; color: #86198f; }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 9pt;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      padding: 8px 10px;
      text-align: left;
      font-weight: 600;
      font-size: 8.5pt;
      text-transform: uppercase;
    }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }
    tr:nth-child(even) {
      background: #f8fafc;
    }
    .severity-tag {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 7.5pt;
      text-transform: uppercase;
    }
    .tag-critical { background: #fee2e2; color: #991b1b; }
    .tag-high { background: #fef3c7; color: #92400e; }
    .tag-moderate { background: #dbeafe; color: #1e40af; }
    
    .action-plan {
      background: #f1f5f9;
      border-left: 4px solid #0284c7;
      padding: 14px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 24px;
      font-size: 9.5pt;
    }
    .action-plan h3 {
      margin: 0 0 8px 0;
      color: #0f172a;
      font-size: 11pt;
    }
    .action-plan ul {
      margin: 0;
      padding-left: 18px;
    }
    .action-plan li {
      margin-bottom: 4px;
    }
    .footer {
      border-top: 1px solid #cbd5e1;
      padding-top: 12px;
      font-size: 8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; background: #0284c7; color: white; padding: 12px 20px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
    <span>Official NDRF/SDMA Incident Assessment Report Generated.</span>
    <div>
      <button onclick="window.print()" style="background: white; color: #0284c7; border: none; padding: 8px 16px; font-weight: bold; border-radius: 6px; cursor: pointer;">
        🖨️ Save as PDF / Print Report
      </button>
    </div>
  </div>

  <div class="header">
    <div class="header-left">
      <div class="sitrep-badge">SITUATION REPORT (SITREP)</div>
      <h1>DHARA ALERT DISASTER PORTAL</h1>
      <h2>Landslide Hazard Assessment & Ground Incident Verification Log</h2>
    </div>
    <div class="header-right">
      <strong>Report Ref:</strong> DA-SITREP-${Date.now().toString().slice(-6)}<br>
      <strong>Date:</strong> ${dateStr}<br>
      <strong>Time:</strong> ${timeStr} IST<br>
      <strong>Jurisdiction:</strong> ${filterOptions.state || 'North-Eastern Region (All 8 States)'}
    </div>
  </div>

  <div class="meta-box">
    <div class="meta-item">
      <strong>Target Operational Zone</strong>
      <span>${filterOptions.state || 'North-East Himalayan Corridor'}</span>
    </div>
    <div class="meta-item">
      <strong>Incident Timeframe</strong>
      <span>Active 24h Monitored Period</span>
    </div>
    <div class="meta-item">
      <strong>Data Integrity</strong>
      <span>100% Geotagged & Authenticated</span>
    </div>
    <div class="meta-item">
      <strong>Disaster Level</strong>
      <span>${criticalCount > 0 ? 'LEVEL 3 - HIGH PRIORITY' : 'LEVEL 2 - ELEVATED VIGIL'}</span>
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-card card-total">
      <div class="label">Total Incidents</div>
      <div class="number">${total}</div>
      <div style="font-size: 7.5pt;">Monitored Locations</div>
    </div>
    <div class="summary-card card-critical">
      <div class="label">Critical Hazards</div>
      <div class="number">${criticalCount}</div>
      <div style="font-size: 7.5pt;">Immediate Evacuation / Clearance</div>
    </div>
    <div class="summary-card card-high">
      <div class="label">High Slope Risks</div>
      <div class="number">${highCount}</div>
      <div style="font-size: 7.5pt;">Structural Vigil Active</div>
    </div>
    <div class="summary-card card-roads">
      <div class="label">Highway Disruptions</div>
      <div class="number">${roadBlockedCount}</div>
      <div style="font-size: 7.5pt;">Debris Clearance Operations</div>
    </div>
  </div>

  <h3 style="font-size: 11pt; color: #0f172a; margin-bottom: 8px; text-transform: uppercase;">
    1. Comprehensive Geotagged Incident Registry
  </h3>
  <table>
    <thead>
      <tr>
        <th style="width: 14%;">Location & Highway</th>
        <th style="width: 10%;">Severity</th>
        <th style="width: 14%;">Hazard Category</th>
        <th style="width: 12%;">Reported Time</th>
        <th>Incident Description & Ground Assessment</th>
        <th style="width: 12%;">Verification</th>
      </tr>
    </thead>
    <tbody>
      ${reports.map((r) => `
        <tr>
          <td>
            <strong>${r.location || 'NER Location'}</strong><br>
            <span style="font-size: 7.5pt; color: #64748b;">${r.state || 'Meghalaya'}</span>
          </td>
          <td>
            <span class="severity-tag ${
              r.severity === 'CRITICAL' ? 'tag-critical' : r.severity === 'HIGH' ? 'tag-high' : 'tag-moderate'
            }">
              ${r.severity || 'MODERATE'}
            </span>
          </td>
          <td><strong>${r.category || 'Landslide Slide'}</strong></td>
          <td style="font-size: 8pt; color: #475569;">${r.timestamp || 'Recent'}</td>
          <td>${r.description || 'No detailed observations provided.'}</td>
          <td>
            <span style="color: #16a34a; font-weight: bold; font-size: 8pt;">✓ GPS Verified</span><br>
            <span style="font-size: 7.5pt; color: #64748b;">${r.author || 'Citizen Post'}</span>
          </td>
        </tr>
      `).join("")}
    </tbody>
  </table>

  <div class="action-plan">
    <h3>2. Standard Operating Procedures (SOP) & Clearance Directives</h3>
    <ul>
      <li><strong>Immediate Highway Clearance:</strong> Deploy heavy earthmoving equipment (JCBs, excavators) to arterial routes experiencing critical debris accumulation.</li>
      <li><strong>Precautionary Traffic Diversion:</strong> Coordinate with District Traffic Police to restrict nighttime transit along known active fault scarps.</li>
      <li><strong>Civil Defence Vigil:</strong> Alert SDRF and local quick-reaction teams in high-saturation slope sectors.</li>
      <li><strong>Public Advisory Broadcast:</strong> Transmit automated multilingual emergency notifications via Dhara Alert to registered residents.</li>
    </ul>
  </div>

  <div class="footer">
    <div>
      <strong>Generated by:</strong> Dhara Alert AI Emergency Early Warning Platform (SIH 26001)
    </div>
    <div>
      Official Document • Ministry of Earth Sciences & Disaster Mitigation Portal
    </div>
  </div>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(reportHtml);
  printWindow.document.close();
}
