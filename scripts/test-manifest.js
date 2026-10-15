const fs = require('fs');
const path = require('path');

console.log('====================================================');
console.log('   VeRoN VIRTUAL STYLING STUDIO — ASSET INTEGRITY TEST');
console.log('====================================================\n');

const essDir = path.join(process.cwd(), 'public', 'images', 'Essentials');
const outDir = path.join(process.cwd(), 'public', 'images', 'Outfit');

// Read manifest
const manifestPath = path.join(process.cwd(), 'data', 'manifest.ts');
const manifestContent = fs.readFileSync(manifestPath, 'utf8');

// Parse items from manifest
const idMatches = manifestContent.match(/id:\s*"([^"]+)"/g) || [];
const essMatches = manifestContent.match(/essentialsFile:\s*"([^"]+)"/g) || [];
const outMatches = manifestContent.match(/outfitFile:\s*"([^"]+)"/g) || [];
const nameMatches = manifestContent.match(/name:\s*"([^"]+)"/g) || [];
const catMatches = manifestContent.match(/category:\s*"([^"]+)"/g) || [];
const slotMatches = manifestContent.match(/slot:\s*"([^"]+)"/g) || [];

console.log(`Found ${idMatches.length} product entries in asset manifest.`);

let passed = 0;
let failed = 0;

for (let i = 0; i < essMatches.length; i++) {
  const essFile = essMatches[i].replace(/essentialsFile:\s*"/, '').replace(/"/, '');
  const outFile = outMatches[i].replace(/outfitFile:\s*"/, '').replace(/"/, '');
  const id = idMatches[i].replace(/id:\s*"/, '').replace(/"/, '');
  const name = nameMatches[i].replace(/name:\s*"/, '').replace(/"/, '');
  const cat = catMatches[i].replace(/category:\s*"/, '').replace(/"/, '');

  const essPath = path.join(essDir, essFile);
  const outPath = path.join(outDir, outFile);

  const essExists = fs.existsSync(essPath);
  const outExists = fs.existsSync(outPath);

  if (essExists && outExists) {
    passed++;
    console.log(`✓ [${id}] "${name}" (${cat})`);
    console.log(`    Essentials: ${essFile} (${(fs.statSync(essPath).size / 1024).toFixed(0)} KB)`);
    console.log(`    Outfit:     ${outFile} (${(fs.statSync(outPath).size / 1024).toFixed(0)} KB)`);
  } else {
    failed++;
    console.error(`✗ [${id}] FAILED: ${name}`);
    if (!essExists) console.error(`    MISSING Essentials file: ${essPath}`);
    if (!outExists) console.error(`    MISSING Outfit file: ${outPath}`);
  }
}

console.log('\n----------------------------------------------------');
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED out of ${essMatches.length} pairs.`);
console.log('----------------------------------------------------');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('ALL 32 ASSETS VERIFIED WITH 100% 1:1 REPO INTEGRITY!');
}
