import { NextRequest } from "next/server";

export function GET(req: NextRequest) {
  const slot = req.nextUrl.searchParams.get("slot") || "top";
  const rawColor = (req.nextUrl.searchParams.get("color") || "e6ddc8").replace("#", "");
  const color = `#${rawColor}`;
  const kind = (req.nextUrl.searchParams.get("kind") || "atelier").toLowerCase();

  // Garment layers tailored to fit the 1024×1536 mannequin model precisely
  let layerSvg = "";

  switch (slot) {
    case "outerwear":
      if (kind === "trench") {
        layerSvg = `
          <!-- Camel Trench Layer on Mannequin -->
          <defs>
            <linearGradient id="l-trench" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="${color}"/>
              <stop offset="70%" stop-color="${color}" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#1b140e"/>
            </linearGradient>
          </defs>
          <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.5))">
            <!-- Draped Trench Body & Sleeves -->
            <path d="M320 340 L450 310 L512 335 L574 310 L704 340 L736 570 L660 595 L636 470 L654 1040 L370 1040 L388 470 L364 595 L288 570 Z" fill="url(#l-trench)"/>
            <!-- Lapels -->
            <path d="M450 310 L512 470 L430 510 L410 400 Z" fill="#fff" opacity="0.1"/>
            <path d="M574 310 L512 470 L594 510 L614 400 Z" fill="#000" opacity="0.2"/>
            <!-- Belt -->
            <path d="M394 620 L630 620 L634 650 L390 650 Z" fill="#1b140e" opacity="0.55"/>
            <rect x="496" y="616" width="32" height="38" rx="3" fill="none" stroke="#d4af37" stroke-width="3"/>
            <!-- Center placket -->
            <line x1="512" y1="470" x2="512" y2="1040" stroke="#000" stroke-width="2.5" opacity="0.3"/>
            <circle cx="528" cy="530" r="4.5" fill="#151210" stroke="#d4af37" stroke-width="1.2"/>
            <circle cx="528" cy="580" r="4.5" fill="#151210" stroke="#d4af37" stroke-width="1.2"/>
            <circle cx="528" cy="720" r="4.5" fill="#151210" stroke="#d4af37" stroke-width="1.2"/>
            <circle cx="528" cy="800" r="4.5" fill="#151210" stroke="#d4af37" stroke-width="1.2"/>
          </g>`;
      } else if (kind === "puffer") {
        layerSvg = `
          <!-- Quilted Puffer Layer -->
          <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.5))">
            <path d="M315 330 C380 300 460 285 512 285 C564 285 644 300 709 330 L742 590 L666 610 L638 470 L648 840 L376 840 L386 470 L358 610 L282 590 Z" fill="${color}"/>
            <path d="M440 295 C476 275 548 275 584 295 L590 250 C550 240 474 240 434 250 Z" fill="${color}" stroke="#111" stroke-width="2"/>
            <path d="M366 400 Q512 430 658 400 M356 500 Q512 530 668 500 M366 600 Q512 630 658 600 M376 700 Q512 730 648 700" stroke="#000" stroke-width="4.5" opacity="0.3" fill="none"/>
            <line x1="512" y1="285" x2="512" y2="840" stroke="#111" stroke-width="4"/>
          </g>`;
      } else {
        // Jackets / Biker / Bomber / Denim
        layerSvg = `
          <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.5))">
            <path d="M320 340 L450 305 L574 305 L704 340 L736 580 L660 600 L636 470 L644 780 L380 780 L388 470 L364 600 L288 580 Z" fill="${color}"/>
            <path d="M450 305 C480 285 544 285 574 305 L550 350 C530 340 494 340 474 350 Z" fill="#111" opacity="0.35"/>
            <line x1="512" y1="305" x2="512" y2="780" stroke="#000" stroke-width="3" opacity="0.35"/>
          </g>`;
      }
      break;

    case "top":
      if (kind === "shirt") {
        layerSvg = `
          <!-- Silk / Poplin Shirt -->
          <g filter="drop-shadow(0 10px 8px rgba(0,0,0,0.4))">
            <path d="M330 340 C410 305 450 295 512 295 C574 295 614 305 694 340 L726 570 L658 590 L632 460 L636 740 L388 740 L392 460 L366 590 L298 570 Z" fill="${color}"/>
            <path d="M464 295 L512 380 L480 390 L440 310 Z" fill="#fff" opacity="0.14"/>
            <path d="M560 295 L512 380 L544 390 L584 310 Z" fill="#000" opacity="0.2"/>
            <line x1="512" y1="380" x2="512" y2="740" stroke="#000" stroke-width="2" opacity="0.25"/>
            <circle cx="512" cy="440" r="3" fill="#fff" opacity="0.5"/>
            <circle cx="512" cy="510" r="3" fill="#fff" opacity="0.5"/>
            <circle cx="512" cy="580" r="3" fill="#fff" opacity="0.5"/>
            <circle cx="512" cy="650" r="3" fill="#fff" opacity="0.5"/>
          </g>`;
      } else {
        // Knitwear / Rollneck
        layerSvg = `
          <!-- Merino Knit / Rollneck -->
          <g filter="drop-shadow(0 10px 8px rgba(0,0,0,0.4))">
            <path d="M330 340 C410 305 450 295 512 295 C574 295 614 305 694 340 L726 570 L658 590 L632 460 L636 740 L388 740 L392 460 L366 590 L298 570 Z" fill="${color}"/>
            <path d="M446 295 C476 330 548 330 578 295 C548 280 476 280 446 295 Z" fill="#111" opacity="0.25"/>
            <!-- Knit ribbing -->
            <path d="M420 380 L420 730 M450 365 L450 735 M480 355 L480 738 M512 350 L512 740 M544 355 L544 738 M574 365 L574 735 M604 380 L604 730" stroke="#fff" stroke-width="1.2" opacity="0.06" fill="none"/>
          </g>`;
      }
      break;

    case "bottom":
      layerSvg = `
        <!-- Tailored Trousers / Denim -->
        <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.45))">
          <path d="M394 620 L630 620 L660 760 L620 1370 L532 1370 L512 790 L492 1370 L404 1370 L364 760 Z" fill="${color}"/>
          <path d="M394 620 L630 620 L630 648 L394 648 Z" fill="#000" opacity="0.2"/>
          <line x1="512" y1="648" x2="512" y2="790" stroke="#000" stroke-width="2.5" opacity="0.35"/>
          <!-- Creases -->
          <line x1="448" y1="670" x2="444" y2="1370" stroke="#fff" stroke-width="1.2" opacity="0.07"/>
          <line x1="576" y1="670" x2="580" y2="1370" stroke="#fff" stroke-width="1.2" opacity="0.07"/>
        </g>`;
      break;

    case "footwear":
      layerSvg = `
        <!-- Chelsea Boots / Sneakers / Loafers -->
        <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.55))">
          <!-- Left Foot -->
          <path d="M396 1360 L486 1360 L494 1460 C494 1485 464 1490 430 1490 C390 1490 380 1475 380 1450 L396 1360 Z" fill="${color}"/>
          <path d="M380 1475 L494 1475 L494 1490 L380 1490 Z" fill="#1b120c"/>
          ${kind === "boots" ? `<path d="M430 1360 L452 1360 L456 1425 L426 1425 Z" fill="#111" opacity="0.5"/>` : ""}

          <!-- Right Foot -->
          <path d="M628 1360 L538 1360 L530 1460 C530 1485 560 1490 594 1490 C634 1490 644 1475 644 1450 L628 1360 Z" fill="${color}"/>
          <path d="M530 1475 L644 1475 L644 1490 L530 1490 Z" fill="#1b120c"/>
          ${kind === "boots" ? `<path d="M594 1360 L572 1360 L568 1425 L598 1425 Z" fill="#111" opacity="0.5"/>` : ""}
        </g>`;
      break;

    case "headwear":
      layerSvg = `
        <!-- Beanie / Cap on Model Head -->
        <g filter="drop-shadow(0 10px 8px rgba(0,0,0,0.45))">
          <path d="M428 100 C428 65 596 65 596 100 L604 185 L420 185 Z" fill="${color}"/>
          ${kind === "cap" ? `
            <path d="M390 185 C450 170 574 170 634 185 C610 220 414 220 390 185 Z" fill="${color}" stroke="#000" stroke-width="2"/>
          ` : `
            <path d="M416 160 L608 160 L608 190 L416 190 Z" fill="#111" opacity="0.25"/>
          `}
        </g>`;
      break;

    case "accessories":
      if (kind === "watch") {
        layerSvg = `
          <!-- Watch on Left Wrist -->
          <g filter="drop-shadow(0 6px 6px rgba(0,0,0,0.5))">
            <rect x="298" y="830" width="34" height="24" rx="4" fill="#1a1a1e"/>
            <circle cx="315" cy="842" r="14" fill="#22242c" stroke="#d4af37" stroke-width="2.5"/>
            <circle cx="315" cy="842" r="11" fill="#0d0e11"/>
          </g>`;
      } else if (kind === "scarf") {
        layerSvg = `
          <!-- Draped Cashmere Scarf -->
          <g filter="drop-shadow(0 10px 8px rgba(0,0,0,0.5))">
            <path d="M450 310 C480 290 544 290 574 310 L600 620 L540 620 L512 360 L484 360 L456 680 L396 680 Z" fill="${color}"/>
            <line x1="396" y1="680" x2="396" y2="700" stroke="${color}" stroke-width="2"/>
            <line x1="416" y1="680" x2="416" y2="700" stroke="${color}" stroke-width="2"/>
            <line x1="436" y1="680" x2="436" y2="700" stroke="${color}" stroke-width="2"/>
            <line x1="456" y1="680" x2="456" y2="700" stroke="${color}" stroke-width="2"/>
          </g>`;
      } else {
        // Leather Crossbody Bag
        layerSvg = `
          <!-- Crossbody Bag -->
          <g filter="drop-shadow(0 12px 10px rgba(0,0,0,0.55))">
            <path d="M574 330 Q440 500 320 680" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
            <path d="M260 670 L370 670 L364 840 C364 855 350 865 334 865 L296 865 C280 865 266 855 266 840 Z" fill="${color}"/>
            <path d="M260 670 L370 670 L362 760 L268 760 Z" fill="#1b120c" opacity="0.45"/>
            <rect x="306" y="750" width="18" height="20" rx="3" fill="#d4af37"/>
          </g>`;
      }
      break;

    default:
      layerSvg = `<path d="M330 340 L512 300 L694 340 L726 570 L658 590 L632 460 L636 740 L388 740 L392 460 L366 590 L298 570 Z" fill="${color}"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1536">
    ${layerSvg}
  </svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public,max-age=31536000,immutable",
    },
  });
}
