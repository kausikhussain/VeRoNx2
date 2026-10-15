import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const slot = req.nextUrl.searchParams.get("slot") || "top";
  const rawColor = (req.nextUrl.searchParams.get("color") || "c5a880").replace("#", "");
  const color = `#${rawColor}`;
  const kind = (req.nextUrl.searchParams.get("kind") || "atelier").toLowerCase();

  // Tailored garment illustrations with rich studio shading & luxury realism
  let garmentSvg = "";

  switch (kind) {
    case "trench":
      garmentSvg = `
        <!-- Camel Wool Trench Coat -->
        <defs>
          <linearGradient id="g-trench" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
            <stop offset="60%" stop-color="${color}" stop-opacity="0.85"/>
            <stop offset="100%" stop-color="#1b140e" stop-opacity="0.95"/>
          </linearGradient>
          <filter id="f-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="14" flood-color="#000" flood-opacity="0.55"/>
          </filter>
        </defs>
        <g filter="url(#f-shadow)">
          <!-- Main Body -->
          <path d="M340 310 L460 270 L564 270 L684 310 L720 540 L648 570 L630 460 L650 940 L374 940 L394 460 L376 570 L304 540 Z" fill="url(#g-trench)"/>
          <!-- Lapels & Collar -->
          <path d="M460 270 L512 440 L440 480 L420 370 Z" fill="#fff" opacity="0.12"/>
          <path d="M564 270 L512 440 L584 480 L604 370 Z" fill="#000" opacity="0.22"/>
          <path d="M450 270 L512 360 L574 270 L550 248 L474 248 Z" fill="${color}" stroke="#221810" stroke-width="2"/>
          <!-- Belt & Details -->
          <path d="M404 630 L620 630 L624 662 L400 662 Z" fill="#1b140e" opacity="0.6"/>
          <rect x="496" y="624" width="32" height="44" rx="4" fill="none" stroke="#d4af37" stroke-width="4"/>
          <!-- Center Placket & Buttons -->
          <line x1="512" y1="440" x2="512" y2="940" stroke="#000" stroke-width="3" opacity="0.3"/>
          <circle cx="530" cy="510" r="5" fill="#151210" stroke="#d4af37" stroke-width="1.5"/>
          <circle cx="530" cy="570" r="5" fill="#151210" stroke="#d4af37" stroke-width="1.5"/>
          <circle cx="530" cy="720" r="5" fill="#151210" stroke="#d4af37" stroke-width="1.5"/>
          <circle cx="530" cy="790" r="5" fill="#151210" stroke="#d4af37" stroke-width="1.5"/>
          <!-- Pocket flaps -->
          <path d="M410 700 L470 710 L468 730 L408 720 Z" fill="#000" opacity="0.25"/>
          <path d="M614 700 L554 710 L556 730 L616 720 Z" fill="#000" opacity="0.25"/>
        </g>`;
      break;

    case "puffer":
      garmentSvg = `
        <defs>
          <linearGradient id="g-puffer" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#141a10"/>
          </linearGradient>
          <filter id="f-puf">
            <feDropShadow dx="0" dy="16" stdDeviation="12" flood-color="#000" flood-opacity="0.5"/>
          </filter>
        </defs>
        <g filter="url(#f-puf)">
          <!-- Quilted Body -->
          <path d="M330 310 C390 280 470 265 512 265 C554 265 634 280 694 310 L730 570 L650 590 L630 460 L640 820 L384 820 L394 460 L374 590 L294 570 Z" fill="url(#g-puffer)"/>
          <!-- Stand Collar -->
          <path d="M440 280 C476 255 548 255 584 280 L590 230 C550 220 474 220 434 230 Z" fill="${color}" stroke="#111" stroke-width="2"/>
          <!-- Quilt Lines -->
          <path d="M370 380 Q512 410 654 380" stroke="#000" stroke-width="5" opacity="0.35" fill="none"/>
          <path d="M360 480 Q512 510 664 480" stroke="#000" stroke-width="5" opacity="0.35" fill="none"/>
          <path d="M370 580 Q512 610 654 580" stroke="#000" stroke-width="5" opacity="0.35" fill="none"/>
          <path d="M380 680 Q512 710 644 680" stroke="#000" stroke-width="5" opacity="0.35" fill="none"/>
          <!-- Front Zipper -->
          <line x1="512" y1="265" x2="512" y2="820" stroke="#111" stroke-width="4"/>
          <line x1="512" y1="265" x2="512" y2="820" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4,2"/>
        </g>`;
      break;

    case "biker":
      garmentSvg = `
        <defs>
          <linearGradient id="g-leather" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#4a342c"/>
            <stop offset="50%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#120c09"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 18px 14px rgba(0,0,0,0.6))">
          <path d="M340 320 L450 280 L574 280 L684 320 L720 570 L650 590 L630 460 L636 760 L388 760 L394 460 L374 590 L304 570 Z" fill="url(#g-leather)"/>
          <!-- Asymmetric Zip -->
          <path d="M460 280 L490 420 L440 450 Z" fill="#251a14"/>
          <path d="M574 280 L490 420 L584 450 Z" fill="#fff" opacity="0.08"/>
          <!-- Silver Zippers & Snaps -->
          <line x1="470" y1="340" x2="520" y2="760" stroke="#c0c5cc" stroke-width="3.5"/>
          <circle cx="448" cy="350" r="4.5" fill="#e0e4ea"/>
          <circle cx="576" cy="350" r="4.5" fill="#e0e4ea"/>
          <circle cx="430" cy="420" r="4" fill="#e0e4ea"/>
          <circle cx="594" cy="420" r="4" fill="#e0e4ea"/>
          <!-- Waist Buckle & Belt -->
          <path d="M388 720 L636 720 L636 756 L388 756 Z" fill="#150e0a"/>
          <rect x="496" y="714" width="32" height="48" rx="3" fill="none" stroke="#c0c5cc" stroke-width="4"/>
        </g>`;
      break;

    case "bomber":
    case "denim":
      garmentSvg = `
        <defs>
          <linearGradient id="g-jacket" x1="0.1" y1="0" x2="0.9" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#0e131a"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 16px 14px rgba(0,0,0,0.5))">
          <path d="M340 310 L450 275 L574 275 L684 310 L720 570 L650 590 L630 460 L636 780 L388 780 L394 460 L374 590 L304 570 Z" fill="url(#g-jacket)"/>
          <!-- Collar -->
          <path d="M450 275 C480 255 544 255 574 275 L550 325 C530 315 494 315 474 325 Z" fill="#111" opacity="0.4"/>
          <!-- Chest Pockets & Stitching -->
          <rect x="420" y="400" width="65" height="70" rx="4" fill="none" stroke="#fff" stroke-width="2" opacity="0.2"/>
          <rect x="539" y="400" width="65" height="70" rx="4" fill="none" stroke="#fff" stroke-width="2" opacity="0.2"/>
          <line x1="512" y1="275" x2="512" y2="780" stroke="#000" stroke-width="3" opacity="0.4"/>
          <!-- Ribbed Hem -->
          <path d="M388 750 L636 750 L636 780 L388 780 Z" fill="#111" opacity="0.3"/>
        </g>`;
      break;

    case "knit":
    case "shirt":
      garmentSvg = `
        <defs>
          <linearGradient id="g-top" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#141312" stop-opacity="0.85"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 16px 14px rgba(0,0,0,0.45))">
          <!-- Main Torso -->
          <path d="M350 320 C420 285 460 275 512 275 C564 275 604 285 674 320 L710 560 L646 580 L624 450 L630 760 L394 760 L400 450 L378 580 L314 560 Z" fill="url(#g-top)"/>
          <!-- Neckline / Collar -->
          ${kind === "shirt" ? `
            <path d="M464 275 L512 370 L480 380 L440 290 Z" fill="#fff" opacity="0.15"/>
            <path d="M560 275 L512 370 L544 380 L584 290 Z" fill="#000" opacity="0.25"/>
            <line x1="512" y1="370" x2="512" y2="760" stroke="#000" stroke-width="2" opacity="0.25"/>
            <circle cx="512" cy="430" r="3.5" fill="#fff" opacity="0.6"/>
            <circle cx="512" cy="510" r="3.5" fill="#fff" opacity="0.6"/>
            <circle cx="512" cy="590" r="3.5" fill="#fff" opacity="0.6"/>
            <circle cx="512" cy="670" r="3.5" fill="#fff" opacity="0.6"/>
          ` : `
            <path d="M450 280 C480 320 544 320 574 280 C544 265 480 265 450 280 Z" fill="#111" opacity="0.3"/>
            <!-- Knit Texture ribs -->
            <path d="M430 380 L430 740 M460 360 L460 750 M490 350 L490 755 M522 350 L522 755 M552 360 L552 750 M582 380 L582 740" stroke="#fff" stroke-width="1.5" opacity="0.06" fill="none"/>
          `}
        </g>`;
      break;

    case "trousers":
    case "denim":
    case "pants":
      garmentSvg = `
        <defs>
          <linearGradient id="g-bottom" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#0a0c10"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 16px 14px rgba(0,0,0,0.5))">
          <!-- Trousers Structure -->
          <path d="M380 340 L644 340 L664 540 L630 960 L528 960 L512 550 L496 960 L394 960 L360 540 Z" fill="url(#g-bottom)"/>
          <!-- Waistband & Creases -->
          <path d="M380 340 L644 340 L644 376 L380 376 Z" fill="#000" opacity="0.25"/>
          <line x1="512" y1="376" x2="512" y2="550" stroke="#000" stroke-width="3" opacity="0.4"/>
          <!-- Press Creases -->
          <line x1="440" y1="410" x2="456" y2="960" stroke="#fff" stroke-width="1.5" opacity="0.08"/>
          <line x1="584" y1="410" x2="568" y2="960" stroke="#fff" stroke-width="1.5" opacity="0.08"/>
        </g>`;
      break;

    case "boots":
    case "sneakers":
    case "loafers":
    case "shoes":
      garmentSvg = `
        <defs>
          <linearGradient id="g-shoe" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#090a0d"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 16px 14px rgba(0,0,0,0.55))">
          <!-- Left Shoe -->
          <path d="M260 620 L370 600 L440 660 L440 760 L230 760 C230 700 240 650 260 620 Z" fill="url(#g-shoe)"/>
          <path d="M230 750 L440 750 L440 770 L230 770 Z" fill="#1b120c"/>
          ${kind === "boots" ? `<path d="M310 610 L350 605 L360 680 L320 685 Z" fill="#111" opacity="0.5"/>` : ""}
          
          <!-- Right Shoe -->
          <path d="M764 620 L654 600 L584 660 L584 760 L794 760 C794 700 784 650 764 620 Z" fill="url(#g-shoe)"/>
          <path d="M584 750 L794 750 L794 770 L584 770 Z" fill="#1b120c"/>
          ${kind === "boots" ? `<path d="M714 610 L674 605 L664 680 L704 685 Z" fill="#111" opacity="0.5"/>` : ""}
        </g>`;
      break;

    case "cap":
    case "beanie":
    case "headwear":
      garmentSvg = `
        <defs>
          <linearGradient id="g-head" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#0c0e12"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 16px 14px rgba(0,0,0,0.5))">
          <path d="M370 420 C370 240 654 240 654 420 Z" fill="url(#g-head)"/>
          ${kind === "cap" ? `
            <path d="M330 420 C420 400 604 400 694 420 C660 480 360 480 330 420 Z" fill="${color}" stroke="#000" stroke-width="2"/>
          ` : `
            <path d="M350 390 L674 390 L674 440 L350 440 Z" fill="#111" opacity="0.3"/>
          `}
        </g>`;
      break;

    case "bag":
    case "watch":
    case "scarf":
    case "accessories":
      garmentSvg = `
        <defs>
          <linearGradient id="g-acc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${color}"/>
            <stop offset="100%" stop-color="#0a0a0c"/>
          </linearGradient>
        </defs>
        <g filter="drop-shadow(0 18px 16px rgba(0,0,0,0.6))">
          ${kind === "watch" ? `
            <!-- Watch -->
            <rect x="472" y="240" width="80" height="560" rx="8" fill="#18181c"/>
            <circle cx="512" cy="520" r="95" fill="#22242c" stroke="#d4af37" stroke-width="12"/>
            <circle cx="512" cy="520" r="80" fill="#0d0e11"/>
            <line x1="512" y1="520" x2="512" y2="470" stroke="#d4af37" stroke-width="4"/>
            <line x1="512" y1="520" x2="550" y2="520" stroke="#fff" stroke-width="3"/>
          ` : kind === "scarf" ? `
            <!-- Cashmere Scarf -->
            <path d="M420 310 C460 280 564 280 604 310 L640 680 L560 680 L520 400 L480 400 L440 760 L360 760 Z" fill="url(#g-acc)"/>
            <!-- Fringe -->
            <line x1="360" y1="760" x2="360" y2="785" stroke="${color}" stroke-width="3"/>
            <line x1="380" y1="760" x2="380" y2="785" stroke="${color}" stroke-width="3"/>
            <line x1="400" y1="760" x2="400" y2="785" stroke="${color}" stroke-width="3"/>
            <line x1="420" y1="760" x2="420" y2="785" stroke="${color}" stroke-width="3"/>
            <line x1="440" y1="760" x2="440" y2="785" stroke="${color}" stroke-width="3"/>
          ` : `
            <!-- Leather Crossbody Bag -->
            <path d="M340 440 L684 440 L674 740 C674 770 650 790 620 790 L404 790 C374 790 350 770 350 740 Z" fill="url(#g-acc)"/>
            <!-- Flap -->
            <path d="M340 440 L684 440 L664 630 L360 630 Z" fill="#1b120c" opacity="0.5"/>
            <!-- Gold Clasp -->
            <rect x="496" y="615" width="32" height="36" rx="4" fill="#d4af37"/>
            <!-- Strap -->
            <path d="M370 440 Q512 180 654 440" fill="none" stroke="${color}" stroke-width="22" stroke-linecap="round"/>
          `}
        </g>`;
      break;

    default:
      garmentSvg = `
        <path d="M340 310 L460 270 L564 270 L684 310 L720 540 L648 570 L630 460 L650 940 L374 940 L394 460 L376 570 L304 540 Z" fill="${color}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1280">
    <defs>
      <radialGradient id="card-bg" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#1B1C22"/>
        <stop offset="55%" stop-color="#14151A"/>
        <stop offset="100%" stop-color="#0E0F13"/>
      </radialGradient>
      <radialGradient id="spot-light" cx="50%" cy="35%" r="45%">
        <stop offset="0%" stop-color="#C5A880" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#C5A880" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="floor-shdw" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#050608" stop-opacity="0.7"/>
        <stop offset="100%" stop-color="#050608" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <!-- Dark Studio Background -->
    <rect width="1024" height="1280" fill="url(#card-bg)"/>
    <rect width="1024" height="1280" fill="url(#spot-light)"/>
    
    <!-- Floor Shadow -->
    <ellipse cx="512" cy="1000" rx="300" ry="50" fill="url(#floor-shdw)"/>

    <!-- Tailored Garment Illustration -->
    ${garmentSvg}

    <!-- Luxury Branding Footer -->
    <text x="64" y="1165" fill="#E8E4DE" font-family="'Playfair Display',Georgia,serif" font-size="20" font-weight="500" letter-spacing="4">AURELIA</text>
    <text x="64" y="1195" fill="#8D8F98" font-family="'DM Mono',monospace" font-size="11" font-weight="500" letter-spacing="3">${kind.toUpperCase()} · ATELIER</text>
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public,max-age=31536000,immutable",
    },
  });
}
