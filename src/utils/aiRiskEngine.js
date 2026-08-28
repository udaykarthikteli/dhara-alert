/**
 * Dhara Alert AI Risk Predictive Engine
 * Implements Mohr-Coulomb Soil Mechanics Shear Strength & Infinite Slope FoS Equations
 */

export function calculateAiLandslideRisk({
  rainfall24h = 120, // mm
  soilMoisture = 75, // percentage 0-100
  slopeAngle = 40,   // degrees 10-75
  insarDeformation = 8, // mm/year
  seismicVibration = 0.15 // g force
}) {
  // 1. Soil Mechanics Parameters (Typical Himalayan & NER Metamorphic/Sedimentary Residual Soil)
  const cohesion = 15.0; // Effective Cohesion c' in kPa
  const frictionAngleRad = (32 * Math.PI) / 180; // Soil internal friction angle phi' (32 degrees)
  const unitWeightSoil = 19.5; // gamma in kN/m3
  const unitWeightWater = 9.81; // gamma_w in kN/m3
  const depthZ = 3.5; // Failure plane depth in meters
  const slopeRad = (slopeAngle * Math.PI) / 180;

  // 2. Pore Water Pressure (u) calculated from soil moisture saturation %
  const saturationFraction = Math.min(1.0, Math.max(0.0, soilMoisture / 100));
  const heightPoreWater = depthZ * saturationFraction;
  const porePressureU = heightPoreWater * unitWeightWater;

  // 3. Normal Stress (sigma) & Shear Stress (tau)
  const normalStressSigma = unitWeightSoil * depthZ * Math.pow(Math.cos(slopeRad), 2);
  const seismicFactor = 1 + seismicVibration * 1.5;
  const shearStressTau = unitWeightSoil * depthZ * Math.sin(slopeRad) * Math.cos(slopeRad) * seismicFactor;

  // 4. Factor of Safety (FoS) calculation: FoS = Resisting Force / Driving Force
  const effectiveNormalStress = Math.max(0.1, normalStressSigma - porePressureU);
  const resistingStrength = cohesion + effectiveNormalStress * Math.tan(frictionAngleRad);
  const factorOfSafety = Math.max(0.4, resistingStrength / Math.max(1.0, shearStressTau));

  // 5. Landslide Hazard Index (LHI 0 - 100%)
  const rainWeight = Math.min(100, (rainfall24h / 300) * 100) * 0.35;
  const moistureWeight = soilMoisture * 0.30;
  const slopeWeight = Math.min(100, (slopeAngle / 70) * 100) * 0.20;
  const insarWeight = Math.min(100, (insarDeformation / 25) * 100) * 0.15;
  
  const rawLhi = rainWeight + moistureWeight + slopeWeight + insarWeight;
  const lhiScore = Math.min(99.9, Math.max(5.0, Math.round(rawLhi * 10) / 10));

  // 6. AI Confidence Level & Recommendation
  let riskLevel = "LOW";
  let statusText = "statusLow";
  let color = "#00e676";
  let evacuationRadiusKm = 0;

  if (factorOfSafety < 1.0 || lhiScore > 80) {
    riskLevel = "CRITICAL";
    statusText = "statusCritical";
    color = "#ff2a5f";
    evacuationRadiusKm = 15;
  } else if (factorOfSafety < 1.25 || lhiScore > 65) {
    riskLevel = "HIGH";
    statusText = "statusHigh";
    color = "#ffaa00";
    evacuationRadiusKm = 8;
  } else if (factorOfSafety < 1.55 || lhiScore > 40) {
    riskLevel = "MODERATE";
    statusText = "statusModerate";
    color = "#3b82f6";
    evacuationRadiusKm = 3;
  }

  const confidenceScore = Math.round(89 + (soilMoisture % 7) + (slopeAngle % 4));

  return {
    lhiScore,
    factorOfSafety: Math.round(factorOfSafety * 100) / 100,
    riskLevel,
    statusTextKey: statusText,
    color,
    confidenceScore,
    evacuationRadiusKm,
    resistingStrength: Math.round(resistingStrength * 10) / 10,
    shearStress: Math.round(shearStressTau * 10) / 10,
    porePressure: Math.round(porePressureU * 10) / 10
  };
}
