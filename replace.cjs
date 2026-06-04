const fs = require('fs');

let appTsx = fs.readFileSync('src/App.tsx', 'utf8');

appTsx = appTsx
  .replace(/EPS Pension Calculator/g, 'EPF Calculator')
  .replace(/EPS_Pension_Estimate_Report/g, 'EPF_Estimate_Report')
  .replace(/EPS Pension Estimate Summary/g, 'EPF Estimate Summary')
  .replace(/EPS Pension Estimate Report/g, 'EPF Estimate Report')
  .replace(/eps_calculator/g, 'epf_calculator')
  .replace(/eps_gateway/g, 'epf_gateway')
  .replace(/EPS Pension/g, 'EPF')
  .replace(/EPS contributions/g, 'EPF contributions')
  .replace(/EPS scheme/g, 'EPF scheme')
  .replace(/standard EPS retirement/g, 'standard EPF retirement')
  .replace(/EPS formula/g, 'EPF formula')
  .replace(/EPS-95/g, 'EPF')
  .replace(/EPS/g, 'EPF');

fs.writeFileSync('src/App.tsx', appTsx);

let indexHtml = fs.readFileSync('index.html', 'utf8');

indexHtml = indexHtml
  .replace(/EPS Pension Calculator/g, 'EPF Calculator')
  .replace(/EPS Pension/g, 'EPF')
  .replace(/EPS/g, 'EPF')
  .replace(/Employees Pension Scheme/g, 'Employees Provident Fund');

fs.writeFileSync('index.html', indexHtml);

console.log('done');
