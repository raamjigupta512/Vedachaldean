import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConsultationReportData, NameAnalysis } from '../types';
import { CHALDEAN_MAP } from './chaldean';
import babyPhoto from '../assets/images/sleeping_newborn_baby_1789326693225.jpg';
import parentsPhoto from '../assets/images/parents_holding_baby_1789326710506.jpg';

// Corner SVG flourish definition
const cornerSvg = `
<svg viewBox="0 0 40 40" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 38V12C2 6.47715 6.47715 2 12 2H38" stroke="#E7C96A" stroke-width="1.8" stroke-linecap="round"/>
  <path d="M7 38V14C7 10.134 10.134 7 14 7H38" stroke="#C9A227" stroke-width="0.8" stroke-opacity="0.8"/>
  <circle cx="12" cy="12" r="3" fill="#E7C96A"/>
  <circle cx="2" cy="38" r="1.5" fill="#E7C96A"/>
  <circle cx="38" cy="2" r="1.5" fill="#E7C96A"/>
  <path d="M12 5V19M5 12H19" stroke="#E7C96A" stroke-width="0.8" stroke-opacity="0.6"/>
</svg>
`;

/**
 * Format mathematical Chaldean calculation for a name
 */
export function formatCalculationString(name: string, compound: number): string {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const vals: number[] = [];
  for (let i = 0; i < clean.length; i++) {
    vals.push(CHALDEAN_MAP[clean[i]] || 1);
  }
  return vals.length > 0 ? `${vals.join('+')} = ${compound}` : `${compound}`;
}

/**
 * Compute Day number calculation breakdown: e.g. "18 → 1 + 8 = 9"
 */
function getDayCalculation(dob: string, birthNumber: number): string {
  if (!dob) return `${birthNumber}`;
  const parts = dob.split('-');
  const day = parseInt(parts[2] || '0', 10);
  if (day <= 9) return `${day}`;
  const digits = day.toString().split('').map(Number);
  return `${day} → ${digits.join(' + ')} = ${birthNumber}`;
}

/**
 * Compute Destiny calculation breakdown: e.g. "1 + 8 + 0 + 3 + 2 + 0 + 2 + 6 = 22 → 4"
 */
function getDestinyCalculation(dob: string, destinyCompound: number, destinyRoot: number): string {
  if (!dob) return `${destinyCompound} → ${destinyRoot}`;
  const digits = dob.replace(/[^0-9]/g, '').split('').map(Number);
  const sumFormula = digits.join(' + ');
  if (destinyCompound === destinyRoot) {
    return `${sumFormula} = ${destinyRoot}`;
  }
  return `${sumFormula} = ${destinyCompound} → ${destinyRoot}`;
}

/**
 * Compute Year calculation: e.g. "2026: 2 + 0 + 2 + 6 = 10 → 1"
 */
function getYearCalculation(dob: string, yearVibration: number): string {
  if (!dob) return `${yearVibration}`;
  const year = dob.split('-')[0] || '2026';
  const digits = year.split('').map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  if (sum === yearVibration) {
    return `${year}: ${digits.join(' + ')} = ${yearVibration}`;
  }
  return `${year}: ${digits.join(' + ')} = ${sum} → ${yearVibration}`;
}

/**
 * Preload image to guarantee complete render in html2canvas
 */
function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

/**
 * Validates report data prior to generation
 */
function validateReportData(report: ConsultationReportData): void {
  if (!report) {
    throw new Error('Consultation report data is required.');
  }
  if (!report.blueprint || typeof report.blueprint.birth_number !== 'number') {
    throw new Error('Numerology blueprint is missing or incomplete.');
  }
  if (!report.top_10 || report.top_10.length === 0) {
    throw new Error('Top 10 recommended names are missing.');
  }
  if (!report.top_3 || !report.top_3.best_overall) {
    throw new Error('Top 3 recommendations are missing.');
  }
}

/**
 * Generates and downloads the high-resolution, print-ready 4-panel A4 Landscape PDF.
 */
export async function generateConsultationPDF(
  report: ConsultationReportData,
  currency: 'INR' | 'USD' = 'INR'
): Promise<void> {
  // Step 1: Verification
  validateReportData(report);

  const priceDisplay = currency === 'INR' ? '₹251' : '$5';
  const originalPriceDisplay = currency === 'INR' ? '₹499' : '$15';

  const {
    input,
    blueprint,
    vedic,
    top_10,
    top_3,
    category_winners
  } = report;

  const babyName = input.baby_name?.trim() || (input.gender === 'girl' ? 'Baby Girl' : input.gender === 'boy' ? 'Baby Boy' : 'Our Baby');
  const surname = input.family_surname?.trim() || '';
  const fullName = surname ? `${babyName} ${surname}` : babyName;
  const formattedDob = new Date(input.date_of_birth + 'T12:00:00').toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Preload images
  await Promise.all([
    preloadImage(babyPhoto),
    preloadImage(parentsPhoto),
    document.fonts ? document.fonts.ready : Promise.resolve()
  ]);

  // Calculations for Panel 2
  const dayCalcStr = getDayCalculation(input.date_of_birth, blueprint.birth_number);
  const destinyCalcStr = getDestinyCalculation(input.date_of_birth, blueprint.destiny_compound, blueprint.destiny_number);
  const yearCalcStr = getYearCalculation(input.date_of_birth, blueprint.year_vibration);

  // Grouped compatible numbers from analysis
  const highlyCompatible = blueprint.preferred_name_numbers?.length ? blueprint.preferred_name_numbers : [1, 3, 6];
  const supportive = blueprint.supportive_numbers?.length ? blueprint.supportive_numbers : [2, 5];
  const neutral = blueprint.neutral_numbers?.length ? blueprint.neutral_numbers : [4, 8];
  const caution = blueprint.caution_numbers?.length ? blueprint.caution_numbers : [7];

  // Vedic check
  const hasVedic = Boolean(vedic?.nakshatra && vedic.nakshatra !== 'Unknown');

  // Category winners list
  const categories = [
    { label: '★ BEST TRADITIONAL', candidate: category_winners?.traditional },
    { label: '✦ BEST MODERN', candidate: category_winners?.modern },
    { label: '✿ BEST UNIQUE', candidate: category_winners?.rare },
    { label: '◉ BEST INTERNATIONAL', candidate: category_winners?.international },
    { label: '♥ BEST MEANING', candidate: category_winners?.meaningful },
    { label: '♛ BEST NUMEROLOGY FIT', candidate: category_winners?.royal || top_3.best_overall }
  ].filter(item => item.candidate && item.candidate.name);

  // Final recommendation
  const top1Reason = top_3.best_overall.why_stands_out ||
    `A harmonious combination of meaning, sound and auspicious Chaldean Compound ${top_3.best_overall.compound_number}, yielding Root ${top_3.best_overall.root_number}.`;

  // Create isolated container in DOM for html2canvas
  // Exact 297mm x 210mm ratio (1.4142857 : 1). At 2376px x 1680px, it provides 300+ DPI.
  const container = document.createElement('div');
  container.id = 'pdf-render-canvas-container';
  container.style.position = 'fixed';
  container.style.left = '-99999px';
  container.style.top = '0';
  container.style.width = '2376px';
  container.style.height = '1680px';
  container.style.backgroundColor = '#071322';
  container.style.color = '#F7F1DF';
  container.style.fontFamily = "'Cinzel', 'Playfair Display', Georgia, serif";
  container.style.overflow = 'hidden';
  container.style.boxSizing = 'border-box';
  container.style.zIndex = '-1000';

  // Build the 4-panel HTML structure
  container.innerHTML = `
    <div style="
      width: 2376px;
      height: 1680px;
      padding: 24px;
      box-sizing: border-box;
      background: radial-gradient(circle at 50% 50%, #0d1b2e 0%, #071322 100%);
      border: 3px solid #C9A227;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 20px;
      position: relative;
    ">
      <!-- Background Star Sparkles Overlay -->
      <div style="
        position: absolute;
        inset: 0;
        background-image: radial-gradient(1px 1px at 40px 60px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 150px 220px, #E7C96A, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 300px 100px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 450px 400px, #F3E6C5, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 700px 250px, #E7C96A, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 900px 150px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 1200px 320px, #E7C96A, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 1500px 180px, #fff, rgba(0,0,0,0)),
                          radial-gradient(1.5px 1.5px at 1800px 400px, #E7C96A, rgba(0,0,0,0)),
                          radial-gradient(1px 1px at 2100px 220px, #F3E6C5, rgba(0,0,0,0));
        background-size: 550px 550px;
        opacity: 0.35;
        pointer-events: none;
      "></div>

      <!-- ======================================================== -->
      <!-- PANEL 1: BABY PROFILE & COVER (Top-Left) -->
      <!-- ======================================================== -->
      <div style="
        position: relative;
        background: #091526;
        border: 2px solid #C9A227;
        border-radius: 16px;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        box-sizing: border-box;
      ">
        <!-- Inner Border Frame -->
        <div style="position: absolute; inset: 6px; border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 12px; pointer-events: none;"></div>
        <!-- Corner Flourishes -->
        <div style="position: absolute; top: 8px; left: 8px;">${cornerSvg}</div>
        <div style="position: absolute; top: 8px; right: 8px; transform: rotate(90deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; right: 8px; transform: rotate(180deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; left: 8px; transform: rotate(-90deg);">${cornerSvg}</div>

        <!-- Header -->
        <div style="text-align: center; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 14px; letter-spacing: 0.3em; text-transform: uppercase; margin-bottom: 4px;">
            ✦ CHALDEAN BABY NAME NUMEROLOGY REPORT ✦
          </div>
          <div style="font-size: 34px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.08em; text-transform: uppercase; text-shadow: 0 2px 10px rgba(231,201,106,0.3);">
            ${fullName}
          </div>
          <div style="color: #E7C96A; font-size: 13px; font-style: italic; font-family: 'Playfair Display', Georgia, serif; margin-top: 4px;">
            "Beautiful. Meaningful. Numerologically Aligned."
          </div>
          <div style="width: 140px; height: 1.5px; background: linear-gradient(90deg, transparent, #C9A227, transparent); margin: 10px auto 0;"></div>
        </div>

        <!-- Center Row: Baby Details + Portrait + Spiritual Pillars -->
        <div style="display: grid; grid-template-columns: 1.15fr 1fr 1.1fr; gap: 16px; align-items: center; position: relative; z-index: 2; margin: 10px 0;">
          
          <!-- Baby Details Card -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.4); border-radius: 12px; padding: 14px 16px;">
            <div style="color: #E7C96A; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; border-bottom: 1px solid rgba(201,162,39,0.3); padding-bottom: 6px; margin-bottom: 10px;">
              Baby Profile Dossier
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Name:</span><strong style="color: #FFFFFF;">${babyName}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Gender:</span><strong style="color: #F3E6C5; text-transform: capitalize;">${input.gender}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Date of Birth:</span><strong style="color: #E7C96A;">${formattedDob}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Time of Birth:</span><strong style="color: #FFFFFF;">${input.time_of_birth || 'Standard Auspicious'}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Place of Birth:</span><strong style="color: #FFFFFF;">${input.place_of_birth || 'Not Specified'}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Surname:</span><strong style="color: #E7C96A;">${surname || 'Family Heritage'}</strong></div>
            </div>
          </div>

          <!-- Portrait Centerpiece -->
          <div style="text-align: center; display: flex; flex-direction: column; align-items: center;">
            <div style="
              width: 175px;
              height: 175px;
              border-radius: 50%;
              padding: 5px;
              background: linear-gradient(135deg, #E7C96A, #7A5B18, #E7C96A);
              box-shadow: 0 0 25px rgba(231, 201, 106, 0.45);
              position: relative;
            ">
              <img src="${babyPhoto}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;" />
              <div style="position: absolute; inset: -4px; border: 1px dashed rgba(231,201,106,0.6); border-radius: 50%;"></div>
            </div>
            <div style="margin-top: 10px; font-size: 11px; color: #E7C96A; letter-spacing: 0.2em; text-transform: uppercase;">
              ✦ AUSPICIOUS NEWBORN ✦
            </div>
          </div>

          <!-- Spiritual Foundations Card -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.4); border-radius: 12px; padding: 14px 16px;">
            <div style="color: #E7C96A; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; border-bottom: 1px solid rgba(201,162,39,0.3); padding-bottom: 6px; margin-bottom: 10px;">
              Core Vibrational Keys
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px; font-family: 'Inter', sans-serif; font-size: 12px;">
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Birth Number:</span><strong style="color: #E7C96A; font-size: 14px;">${blueprint.birth_number}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Destiny Number:</span><strong style="color: #E7C96A; font-size: 14px;">${blueprint.destiny_compound} / ${blueprint.destiny_number}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Ruling Planet:</span><strong style="color: #FFFFFF;">${blueprint.birth_planet}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Ideal Vibrations:</span><strong style="color: #A3E635;">${highlyCompatible.join(', ')}</strong></div>
              <div style="display: flex; justify-content: space-between;"><span style="color: #B8B9BD;">Year Vibration:</span><strong style="color: #FFFFFF;">${blueprint.year_vibration}</strong></div>
            </div>
          </div>
        </div>

        <!-- 4 Small Highlight Cards -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; position: relative; z-index: 2;">
          <div style="background: rgba(13, 27, 46, 0.8); border: 1px solid rgba(201,162,39,0.3); border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div style="color: #E7C96A; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">POSITIVE VIBRATION</div>
            <div style="color: #B8B9BD; font-size: 9.5px; font-family: 'Inter', sans-serif; margin-top: 2px;">Harmonious Chaldean resonance</div>
          </div>
          <div style="background: rgba(13, 27, 46, 0.8); border: 1px solid rgba(201,162,39,0.3); border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div style="color: #E7C96A; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">STRONG VALUES</div>
            <div style="color: #B8B9BD; font-size: 9.5px; font-family: 'Inter', sans-serif; margin-top: 2px;">Noble character &amp; wisdom</div>
          </div>
          <div style="background: rgba(13, 27, 46, 0.8); border: 1px solid rgba(201,162,39,0.3); border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div style="color: #E7C96A; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">HAPPINESS &amp; HEALTH</div>
            <div style="color: #B8B9BD; font-size: 9.5px; font-family: 'Inter', sans-serif; margin-top: 2px;">Cosmic protection &amp; peace</div>
          </div>
          <div style="background: rgba(13, 27, 46, 0.8); border: 1px solid rgba(201,162,39,0.3); border-radius: 8px; padding: 8px 10px; text-align: center;">
            <div style="color: #E7C96A; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">MEANINGFUL LEGACY</div>
            <div style="color: #B8B9BD; font-size: 9.5px; font-family: 'Inter', sans-serif; margin-top: 2px;">A timeless family gift</div>
          </div>
        </div>

        <!-- Bottom Statement -->
        <div style="text-align: center; color: #E7C96A; font-size: 11.5px; font-style: italic; border-top: 1px solid rgba(201,162,39,0.25); padding-top: 8px; position: relative; z-index: 2;">
          "A name is one of the first gifts a parent gives a child."
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PANEL 2: NUMEROLOGY BLUEPRINT (Top-Right) -->
      <!-- ======================================================== -->
      <div style="
        position: relative;
        background: #091526;
        border: 2px solid #C9A227;
        border-radius: 16px;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        box-sizing: border-box;
      ">
        <div style="position: absolute; inset: 6px; border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 12px; pointer-events: none;"></div>
        <div style="position: absolute; top: 8px; left: 8px;">${cornerSvg}</div>
        <div style="position: absolute; top: 8px; right: 8px; transform: rotate(90deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; right: 8px; transform: rotate(180deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; left: 8px; transform: rotate(-90deg);">${cornerSvg}</div>

        <!-- Header -->
        <div style="text-align: center; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase;">
            ✦ CHALDEAN NUMEROLOGY ANALYSIS ✦
          </div>
          <div style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em; text-transform: uppercase;">
            YOUR BABY'S NUMEROLOGY BLUEPRINT
          </div>
          <div style="width: 140px; height: 1.5px; background: linear-gradient(90deg, transparent, #C9A227, transparent); margin: 6px auto 0;"></div>
        </div>

        <!-- Sections 1, 2, 3: Birth Number, Destiny Number, Year Vibration -->
        <div style="display: grid; grid-template-columns: 1fr 1.3fr 0.9fr; gap: 12px; position: relative; z-index: 2;">
          <!-- Birth Number -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 12px; text-align: center;">
            <div style="color: #E7C96A; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">BIRTH NUMBER</div>
            <div style="font-size: 34px; font-weight: 800; color: #E7C96A; line-height: 1.1; margin: 4px 0;">
              ${blueprint.birth_number}
            </div>
            <div style="font-size: 11px; color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 600;">
              ${dayCalcStr}
            </div>
            <div style="font-size: 9.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-top: 4px;">
              Ruled by ${blueprint.birth_planet}. Leadership, vitality &amp; inner strength.
            </div>
          </div>

          <!-- Destiny Number -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 12px; text-align: center;">
            <div style="color: #E7C96A; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">DESTINY NUMBER</div>
            <div style="font-size: 34px; font-weight: 800; color: #E7C96A; line-height: 1.1; margin: 4px 0;">
              ${blueprint.destiny_compound} / ${blueprint.destiny_number}
            </div>
            <div style="font-size: 11px; color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 600;">
              ${destinyCalcStr}
            </div>
            <div style="font-size: 9.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-top: 4px;">
              Governs life path, vocational resonance &amp; destiny milestones.
            </div>
          </div>

          <!-- Year Vibration -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 12px; text-align: center;">
            <div style="color: #E7C96A; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;">YEAR VIBRATION</div>
            <div style="font-size: 34px; font-weight: 800; color: #E7C96A; line-height: 1.1; margin: 4px 0;">
              ${blueprint.year_vibration}
            </div>
            <div style="font-size: 11px; color: #FFFFFF; font-family: 'Inter', sans-serif; font-weight: 600;">
              ${yearCalcStr}
            </div>
            <div style="font-size: 9.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-top: 4px;">
              Universal cycle of fresh beginnings &amp; noble vitality.
            </div>
          </div>
        </div>

        <!-- Section 4: Chaldean Letter-Number System Table -->
        <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 14px; position: relative; z-index: 2;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(201,162,39,0.3); padding-bottom: 4px; margin-bottom: 6px;">
            <span style="color: #E7C96A; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">
              CHALDEAN LETTER-NUMBER SYSTEM
            </span>
            <span style="color: #B8B9BD; font-size: 9px; font-family: 'Inter', sans-serif; font-style: italic;">
              Number 9 is sacred &amp; unassigned to individual letters
            </span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 6px; text-align: center; font-family: 'Inter', sans-serif;">
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">1</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">A I J Q Y</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">2</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">B K R</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">3</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">C G L S</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">4</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">D M T</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">5</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">E H N X</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">6</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">U V W</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">7</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">O Z</div>
            </div>
            <div style="background: rgba(13,27,46,0.9); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 2px;">
              <div style="color: #E7C96A; font-weight: 800; font-size: 13px;">8</div>
              <div style="color: #FFFFFF; font-size: 10px; font-weight: 600;">F P</div>
            </div>
          </div>
        </div>

        <!-- Section 5: Compatible Name Numbers (Dynamic from analysis) -->
        <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 14px; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 8px;">
            COMPATIBLE NAME NUMBERS (BASED ON BIRTH PROFILE)
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; font-family: 'Inter', sans-serif;">
            <div>
              <div style="font-size: 9px; color: #10B981; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">HIGHLY COMPATIBLE</div>
              <div style="display: flex; gap: 5px;">
                ${highlyCompatible.map(n => `<span style="display: inline-block; width: 26px; height: 26px; line-height: 26px; text-align: center; border-radius: 6px; background: rgba(16, 185, 129, 0.25); border: 1px solid #10B981; color: #6EE7B7; font-weight: 800; font-size: 13px;">${n}</span>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size: 9px; color: #F59E0B; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">SUPPORTIVE</div>
              <div style="display: flex; gap: 5px;">
                ${supportive.map(n => `<span style="display: inline-block; width: 26px; height: 26px; line-height: 26px; text-align: center; border-radius: 6px; background: rgba(245, 158, 11, 0.25); border: 1px solid #F59E0B; color: #FDE68A; font-weight: 800; font-size: 13px;">${n}</span>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size: 9px; color: #60A5FA; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">NEUTRAL</div>
              <div style="display: flex; gap: 5px;">
                ${neutral.map(n => `<span style="display: inline-block; width: 26px; height: 26px; line-height: 26px; text-align: center; border-radius: 6px; background: rgba(96, 165, 250, 0.25); border: 1px solid #60A5FA; color: #BFDBFE; font-weight: 800; font-size: 13px;">${n}</span>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size: 9px; color: #F43F5E; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">USE WITH CAUTION</div>
              <div style="display: flex; gap: 5px;">
                ${caution.map(n => `<span style="display: inline-block; width: 26px; height: 26px; line-height: 26px; text-align: center; border-radius: 6px; background: rgba(244, 63, 94, 0.25); border: 1px solid #F43F5E; color: #FECDD3; font-weight: 800; font-size: 13px;">${n}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Section 6: Vedic Nakshatra Naming & Core Strengths -->
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; position: relative; z-index: 2;">
          <!-- Vedic Details -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 12px; font-family: 'Inter', sans-serif;">
            <div style="color: #E7C96A; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">
              VEDIC NAKSHATRA NAMING ALIGNMENT
            </div>
            ${hasVedic ? `
              <div style="font-size: 10.5px; display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
                <div><span style="color: #B8B9BD;">Rashi:</span> <strong style="color: #FFFFFF;">${vedic?.moon_sign || 'Meena (Pisces)'}</strong></div>
                <div><span style="color: #B8B9BD;">Nakshatra:</span> <strong style="color: #E7C96A;">${vedic?.nakshatra || 'Uttara Bhadra'}</strong></div>
                <div><span style="color: #B8B9BD;">Pada:</span> <strong style="color: #FFFFFF;">Pada ${vedic?.nakshatra_pada || 4}</strong></div>
                <div><span style="color: #B8B9BD;">Starting Sounds:</span> <strong style="color: #E7C96A;">${vedic?.traditional_syllables?.slice(0, 4).join(', ') || 'De, Do, Cha'}</strong></div>
              </div>
            ` : `
              <div style="color: #B8B9BD; font-size: 9.5px; font-style: italic;">
                Vedic Nakshatra naming layer unavailable — exact birth time and location required.
              </div>
            `}
          </div>

          <!-- Key Strengths -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 12px; font-family: 'Inter', sans-serif;">
            <div style="color: #E7C96A; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">
              KEY CONSTITUTIONAL STRENGTHS
            </div>
            <div style="font-size: 10px; color: #FFFFFF; display: flex; flex-direction: column; gap: 3px;">
              <div>✦ High natural executive courage and intellectual acumen</div>
              <div>✦ Warm charisma, creative magnetism &amp; harmonious speech</div>
              <div>✦ Resilience under pressure; strong protective family bonds</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PANEL 3: TOP 10 RECOMMENDED BABY NAMES (Bottom-Left) -->
      <!-- ======================================================== -->
      <div style="
        position: relative;
        background: #091526;
        border: 2px solid #C9A227;
        border-radius: 16px;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        box-sizing: border-box;
      ">
        <div style="position: absolute; inset: 6px; border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 12px; pointer-events: none;"></div>
        <div style="position: absolute; top: 8px; left: 8px;">${cornerSvg}</div>
        <div style="position: absolute; top: 8px; right: 8px; transform: rotate(90deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; right: 8px; transform: rotate(180deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; left: 8px; transform: rotate(-90deg);">${cornerSvg}</div>

        <!-- Header -->
        <div style="text-align: center; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase;">
            ✦ BEAUTIFUL NAMES • POSITIVE VIBRATIONS • MEANINGFUL CHOICES ✦
          </div>
          <div style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em; text-transform: uppercase;">
            TOP 10 RECOMMENDED BABY NAMES
          </div>
          <div style="width: 140px; height: 1.5px; background: linear-gradient(90deg, transparent, #C9A227, transparent); margin: 6px auto 0;"></div>
        </div>

        <!-- Master Ranking Table -->
        <div style="position: relative; z-index: 2; margin: 8px 0; overflow: hidden; border-radius: 10px; border: 1px solid rgba(201, 162, 39, 0.4);">
          <table style="width: 100%; border-collapse: collapse; font-family: 'Inter', sans-serif; font-size: 11px; text-align: left;">
            <thead>
              <tr style="background: rgba(201, 162, 39, 0.2); color: #E7C96A; font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 0.05em;">
                <th style="padding: 7px 8px; text-align: center; width: 40px;">#</th>
                <th style="padding: 7px 10px;">NAME</th>
                <th style="padding: 7px 10px;">MEANING</th>
                <th style="padding: 7px 10px;">CHALDEAN CALCULATION</th>
                <th style="padding: 7px 8px; text-align: center; width: 70px;">COMPOUND</th>
                <th style="padding: 7px 8px; text-align: center; width: 55px;">ROOT</th>
                <th style="padding: 7px 8px; text-align: center; width: 55px;">SCORE</th>
              </tr>
            </thead>
            <tbody>
              ${top_10.map((candidate, idx) => {
                const rankNum = idx + 1;
                const isTop3 = rankNum <= 3;
                const calcStr = formatCalculationString(candidate.name, candidate.compound_number);
                const rankDisplay = rankNum === 1 ? '🥇 1' : rankNum === 2 ? '🥈 2' : rankNum === 3 ? '🥉 3' : `${rankNum < 10 ? '0' + rankNum : rankNum}`;
                const rowBg = idx % 2 === 0 ? 'rgba(7, 19, 34, 0.9)' : 'rgba(13, 27, 46, 0.7)';
                const highlightBorder = isTop3 ? 'border-left: 3px solid #E7C96A;' : '';
                return `
                  <tr style="background: ${rowBg}; border-top: 1px solid rgba(201, 162, 39, 0.15); ${highlightBorder}">
                    <td style="padding: 5.5px 8px; text-align: center; font-weight: 800; color: ${isTop3 ? '#E7C96A' : '#B8B9BD'};">${rankDisplay}</td>
                    <td style="padding: 5.5px 10px; font-weight: 700; color: ${isTop3 ? '#FFFFFF' : '#F3E6C5'}; font-size: 11.5px;">${candidate.name}</td>
                    <td style="padding: 5.5px 10px; color: #B8B9BD; max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${candidate.meaning}</td>
                    <td style="padding: 5.5px 10px; font-family: 'Courier New', monospace; font-weight: 700; color: #E7C96A; font-size: 10.5px;">${calcStr}</td>
                    <td style="padding: 5.5px 8px; text-align: center; font-weight: 800; color: #FFFFFF;">${candidate.compound_number}</td>
                    <td style="padding: 5.5px 8px; text-align: center; font-weight: 800; color: #E7C96A;">${candidate.root_number}</td>
                    <td style="padding: 5.5px 8px; text-align: center; font-weight: 800; color: #10B981;">${candidate.score}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>

        <!-- Bottom Row: Why These Names Checklist + Parent & Child Silhouette -->
        <div style="display: grid; grid-template-columns: 1.4fr 1fr; gap: 14px; align-items: center; position: relative; z-index: 2;">
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 14px;">
            <div style="color: #E7C96A; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">
              WHY THESE NAMES?
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-family: 'Inter', sans-serif; font-size: 10.5px; color: #FFFFFF;">
              <div>✓ Numerologically aligned</div>
              <div>✓ Meaningful &amp; auspicious</div>
              <div>✓ Easy to pronounce globally</div>
              <div>✓ Suitable for long-term use</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 8px 12px;">
            <div style="width: 55px; height: 55px; border-radius: 50%; overflow: hidden; border: 1px solid #E7C96A; flex-shrink: 0;">
              <img src="${parentsPhoto}" style="width: 100%; height: 100%; object-fit: cover;" />
            </div>
            <div>
              <div style="color: #E7C96A; font-size: 11.5px; font-style: italic; font-family: 'Playfair Display', serif;">
                "A name today, a brighter tomorrow."
              </div>
              <div style="color: #B8B9BD; font-size: 9px; font-family: 'Inter', sans-serif; margin-top: 2px;">
                Cherished for a lifetime of honor.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ======================================================== -->
      <!-- PANEL 4: FINAL TOP 3 & SELECTION DOSSIER (Bottom-Right) -->
      <!-- ======================================================== -->
      <div style="
        position: relative;
        background: #091526;
        border: 2px solid #C9A227;
        border-radius: 16px;
        padding: 24px 28px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        box-sizing: border-box;
      ">
        <div style="position: absolute; inset: 6px; border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 12px; pointer-events: none;"></div>
        <div style="position: absolute; top: 8px; left: 8px;">${cornerSvg}</div>
        <div style="position: absolute; top: 8px; right: 8px; transform: rotate(90deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; right: 8px; transform: rotate(180deg);">${cornerSvg}</div>
        <div style="position: absolute; bottom: 8px; left: 8px; transform: rotate(-90deg);">${cornerSvg}</div>

        <!-- Header -->
        <div style="text-align: center; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 13px; letter-spacing: 0.25em; text-transform: uppercase;">
            ✦ PERSONALIZED • MEANINGFUL • NUMEROLOGICALLY ALIGNED ✦
          </div>
          <div style="font-size: 26px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em; text-transform: uppercase;">
            YOUR TOP 3 NAME RECOMMENDATIONS
          </div>
          <div style="width: 140px; height: 1.5px; background: linear-gradient(90deg, transparent, #C9A227, transparent); margin: 6px auto 0;"></div>
        </div>

        <!-- Top 3 Laureate Cards -->
        <div style="display: grid; grid-template-columns: 1.15fr 1fr 1fr; gap: 10px; position: relative; z-index: 2;">
          
          <!-- Card 1: Best Overall -->
          <div style="
            background: linear-gradient(135deg, rgba(201, 162, 39, 0.18), rgba(7, 19, 34, 0.95));
            border: 1.5px solid #E7C96A;
            border-radius: 10px;
            padding: 12px;
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.2);
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="background: #E7C96A; color: #071322; font-weight: 800; font-size: 9.5px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                🥇 BEST OVERALL
              </span>
              <span style="color: #10B981; font-weight: 800; font-size: 12px; font-family: 'Inter', sans-serif;">
                ${top_3.best_overall.score}/100
              </span>
            </div>
            <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.04em;">
              ${top_3.best_overall.name}
            </div>
            <div style="font-size: 10.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
              ${top_3.best_overall.meaning}
            </div>
            <div style="font-size: 10.5px; font-family: 'Inter', sans-serif; color: #E7C96A; font-weight: 700; margin-bottom: 6px;">
              Chaldean: ${top_3.best_overall.compound_number} / Root: ${top_3.best_overall.root_number}
            </div>
            <div style="font-size: 9px; color: #FFFFFF; font-family: 'Inter', sans-serif; border-top: 1px solid rgba(201,162,39,0.3); padding-top: 5px;">
              <strong>WHY IT STANDS OUT:</strong>
              <div style="margin-top: 2px; line-height: 1.35; color: #E2E8F0;">
                ${top_3.best_overall.why_stands_out || 'Harmonious compound vibration providing high executive luck, dignity, and auspicious global appeal.'}
              </div>
            </div>
          </div>

          <!-- Card 2: Strong Alternative -->
          <div style="
            background: rgba(7, 19, 34, 0.85);
            border: 1px solid rgba(201, 162, 39, 0.4);
            border-radius: 10px;
            padding: 12px;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="background: rgba(255,255,255,0.15); color: #FFFFFF; font-weight: 700; font-size: 9.5px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                🥈 STRONG ALTERNATIVE
              </span>
              <span style="color: #10B981; font-weight: 800; font-size: 12px; font-family: 'Inter', sans-serif;">
                ${top_3.strong_alternative.score}/100
              </span>
            </div>
            <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.04em;">
              ${top_3.strong_alternative.name}
            </div>
            <div style="font-size: 10.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
              ${top_3.strong_alternative.meaning}
            </div>
            <div style="font-size: 10.5px; font-family: 'Inter', sans-serif; color: #E7C96A; font-weight: 700; margin-bottom: 6px;">
              Chaldean: ${top_3.strong_alternative.compound_number} / Root: ${top_3.strong_alternative.root_number}
            </div>
            <div style="font-size: 9px; color: #FFFFFF; font-family: 'Inter', sans-serif; border-top: 1px solid rgba(201,162,39,0.3); padding-top: 5px;">
              <strong>WHY IT STANDS OUT:</strong>
              <div style="margin-top: 2px; line-height: 1.35; color: #E2E8F0;">
                ${top_3.strong_alternative.why_stands_out || 'Solid classical root with supportive planetary frequency, fostering peace and stability.'}
              </div>
            </div>
          </div>

          <!-- Card 3: Unique Alternative -->
          <div style="
            background: rgba(7, 19, 34, 0.85);
            border: 1px solid rgba(201, 162, 39, 0.4);
            border-radius: 10px;
            padding: 12px;
          ">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="background: rgba(201, 162, 39, 0.2); color: #E7C96A; font-weight: 700; font-size: 9.5px; padding: 2px 6px; border-radius: 4px; text-transform: uppercase;">
                🥉 UNIQUE ALTERNATIVE
              </span>
              <span style="color: #10B981; font-weight: 800; font-size: 12px; font-family: 'Inter', sans-serif;">
                ${top_3.unique_alternative.score}/100
              </span>
            </div>
            <div style="font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.04em;">
              ${top_3.unique_alternative.name}
            </div>
            <div style="font-size: 10.5px; color: #B8B9BD; font-family: 'Inter', sans-serif; margin-bottom: 6px;">
              ${top_3.unique_alternative.meaning}
            </div>
            <div style="font-size: 10.5px; font-family: 'Inter', sans-serif; color: #E7C96A; font-weight: 700; margin-bottom: 6px;">
              Chaldean: ${top_3.unique_alternative.compound_number} / Root: ${top_3.unique_alternative.root_number}
            </div>
            <div style="font-size: 9px; color: #FFFFFF; font-family: 'Inter', sans-serif; border-top: 1px solid rgba(201,162,39,0.3); padding-top: 5px;">
              <strong>WHY IT STANDS OUT:</strong>
              <div style="margin-top: 2px; line-height: 1.35; color: #E2E8F0;">
                ${top_3.unique_alternative.why_stands_out || 'Distinctive lyrical quality, rare contemporary sound, and auspicious numerological resonance.'}
              </div>
            </div>
          </div>
        </div>

        <!-- Horizontal Category Winners Strip -->
        <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 8px; padding: 8px 12px; position: relative; z-index: 2;">
          <div style="color: #E7C96A; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 6px;">
            SPECIAL CATEGORY RECOGNITIONS
          </div>
          <div style="display: grid; grid-template-columns: repeat(${categories.length}, 1fr); gap: 6px; font-family: 'Inter', sans-serif; text-align: center;">
            ${categories.map(cat => `
              <div style="background: rgba(13, 27, 46, 0.85); border: 1px solid rgba(201,162,39,0.25); border-radius: 6px; padding: 4px 6px;">
                <div style="color: #E7C96A; font-size: 8.5px; font-weight: 700;">${cat.label}</div>
                <div style="color: #FFFFFF; font-size: 11px; font-weight: 800; margin-top: 2px;">${cat.candidate?.name}</div>
                <div style="color: #B8B9BD; font-size: 8px;">Score: ${cat.candidate?.score}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bottom Grid: Parent Guidance + Final Recommendation -->
        <div style="display: grid; grid-template-columns: 1.3fr 1.1fr; gap: 12px; position: relative; z-index: 2;">
          
          <!-- Parent Guidance -->
          <div style="background: rgba(7, 19, 34, 0.85); border: 1px solid rgba(201, 162, 39, 0.35); border-radius: 10px; padding: 10px 14px; font-family: 'Inter', sans-serif;">
            <div style="color: #E7C96A; font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 5px;">
              PARENT GUIDANCE &amp; PRACTICAL WISDOM
            </div>
            <div style="font-size: 9.5px; color: #E2E8F0; display: flex; flex-direction: column; gap: 3px; line-height: 1.35;">
              <div>• Choose the name that feels intuitive, joyful and right to your family.</div>
              <div>• Consider both traditional heritage and effortless global pronunciation.</div>
              <div>• Check how the name flows naturally with your family surname.</div>
              <div>• Test how the name will age gracefully from childhood to adulthood.</div>
            </div>
          </div>

          <!-- Our Recommendation Box -->
          <div style="
            background: linear-gradient(135deg, rgba(231, 201, 106, 0.15), rgba(7, 19, 34, 0.95));
            border: 1.5px solid #E7C96A;
            border-radius: 10px;
            padding: 10px 14px;
            text-align: center;
          ">
            <div style="color: #E7C96A; font-size: 10.5px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">
              OUR TOP RECOMMENDATION
            </div>
            <div style="font-size: 22px; font-weight: 800; color: #FFFFFF; letter-spacing: 0.05em; margin: 2px 0;">
              ${top_3.best_overall.name} ${surname ? surname : ''}
            </div>
            <div style="font-size: 10px; color: #E7C96A; font-style: italic; font-family: 'Playfair Display', serif; line-height: 1.3;">
              "${top1Reason}"
            </div>
          </div>
        </div>

        <!-- Atelier Archival Commission & Provenance Seal -->
        <div style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(7, 19, 34, 0.95);
          border: 1px solid rgba(201, 162, 39, 0.45);
          border-radius: 8px;
          padding: 6px 12px;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 2;
        ">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(201, 162, 39, 0.2); color: #E7C96A; font-size: 8.5px; font-weight: 700; padding: 2px 7px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid rgba(201,162,39,0.35);">
              ✦ Archival Dossier Commission
            </span>
            <span style="color: #94A3B8; font-size: 9px;">Standard Valuation:</span>
            <span style="color: #94A3B8; font-size: 9.5px; text-decoration: line-through; text-decoration-color: #C9A227; font-family: 'Playfair Display', serif;">${originalPriceDisplay}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="background: rgba(16, 185, 129, 0.2); color: #34D399; font-size: 8px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(52, 211, 153, 0.45);">
              50% Courtesy Blessing
            </span>
            <span style="color: #E2E8F0; font-size: 9px;">Sacred Shagun Offering:</span>
            <span style="color: #FFFFFF; font-size: 11px; font-weight: 800; font-family: 'Playfair Display', serif; letter-spacing: 0.02em;">${priceDisplay}</span>
          </div>
        </div>

        <!-- Small Disclaimer Footer -->
        <div style="
          text-align: center;
          color: #8E9BAE;
          font-size: 8px;
          font-family: 'Inter', sans-serif;
          line-height: 1.35;
          border-top: 1px solid rgba(201,162,39,0.2);
          padding-top: 6px;
          position: relative;
          z-index: 2;
        ">
          This report uses traditional Chaldean numerology and, where applicable, Vedic naming principles as a cultural and spiritual naming framework. Numerology and astrology are not scientifically proven methods for predicting a child's future, personality, health or success. The recommendations are intended to help parents explore names and should not replace personal, cultural or family judgment.
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    // Render to ultra-high-resolution canvas
    const canvas = await html2canvas(container, {
      scale: 1.8, // Produces ~4276 x 3024 pixels, ultra-crisp print quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#071322',
      logging: false,
      windowWidth: 2376,
      windowHeight: 1680
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.95);

    // Create single A4 Landscape PDF
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // 297mm x 210mm A4 landscape dimensions
    doc.addImage(imgData, 'JPEG', 0, 0, 297, 210, undefined, 'FAST');

    // Invisible selectable text layer for searchability and document accessibility
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(1);
    doc.setTextColor(255, 255, 255);
    doc.text(
      `Chaldean Baby Name Numerology Report: ${fullName}. Birth Number: ${blueprint.birth_number}, Destiny Number: ${blueprint.destiny_compound}/${blueprint.destiny_number}. Top Recommended Names: ${top_10.map(t => t.name).join(', ')}. Top Recommendation: ${top_3.best_overall.name}.`,
      10,
      10
    );

    // Sanitize baby name for filename
    const safeName = fullName.replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_');
    const filename = `Chaldean_Baby_Name_Numerology_Report_${safeName}.pdf`;

    // Download PDF
    doc.save(filename);
  } finally {
    // Clean up temporary DOM element
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}
