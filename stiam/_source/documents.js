// Transforme les modèles _source/_docs/*.json (produits par documents.py) en fichiers Word.
// Usage : node _source/documents.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, WidthType, ShadingType,
  BorderStyle, AlignmentType, HeadingLevel, LineRuleType, LevelFormat, Footer, Header, PageNumber, PageBreak,
} = require('docx');

const ICI = __dirname;
const SITE = path.dirname(ICI);
const SRC = path.join(ICI, '_docs');
const NAVY = '20354E', TEAL = '12877F', GREY = '65778C', RUST = 'CA694E';
const LARGEUR = 9866; // A4 (11906) moins deux marges de 1020
const FONT = 'Arial';

function dossierCible(fichier) {
  if (fichier.includes('Livret')) return path.join(SITE, 'telechargements', 'eleves');
  if (fichier.includes('Atlas')) return path.join(SITE, 'telechargements', 'atlas');
  return path.join(SITE, 'telechargements', 'enseignants');
}

const run = (text, opts = {}) => new TextRun({ text, font: FONT, ...opts });

function para(b) {
  const style = b.style || '';
  const kids = [];
  if (b.gras) kids.push(run(b.gras, { bold: true }));
  const o = {};
  if (style === 'gras') o.bold = true;
  if (style === 'discret') { o.color = GREY; o.size = 18; }
  if (style === 'intro') { o.size = 24; o.color = NAVY; }
  kids.push(run(b.texte, o));
  const p = { children: kids, spacing: { after: 100 } };
  if (style === 'alerte') {
    p.shading = { type: ShadingType.CLEAR, fill: 'FFF6E0', color: 'auto' };
    p.border = { left: { style: BorderStyle.SINGLE, size: 18, color: 'EFB64B', space: 6 } };
    p.spacing = { before: 120, after: 120 };
    p.indent = { left: 120 };
  }
  if (style === 'gras') p.keepNext = true;
  return [new Paragraph(p)];
}

function table(b) {
  const total = b.poids.reduce((x, y) => x + y, 0);
  const larg = b.poids.map(w => Math.floor(LARGEUR * w / total));
  larg[larg.length - 1] += LARGEUR - larg.reduce((x, y) => x + y, 0);
  const bord = { style: BorderStyle.SINGLE, size: 4, color: 'B8C7CF' };
  const borders = { top: bord, bottom: bord, left: bord, right: bord };
  const cell = (txt, i, head) => new TableCell({
    width: { size: larg[i], type: WidthType.DXA }, borders,
    shading: head ? { type: ShadingType.CLEAR, fill: 'E3F1EF', color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 90, right: 90 },
    children: [new Paragraph({ children: [run(txt === '' ? ' ' : txt, { bold: head, size: 18 })], spacing: { after: 0 } })],
  });
  const rows = [];
  if (b.entete) rows.push(new TableRow({ tableHeader: true, cantSplit: true, children: b.colonnes.map((c, i) => cell(c, i, true)) }));
  for (const l of b.lignes) {
    const vide = l.slice(1).every(x => x === '');
    rows.push(new TableRow({ cantSplit: true, height: vide ? { value: 520, rule: 'atLeast' } : undefined, children: l.map((c, i) => cell(c, i, false)) }));
  }
  return [new Table({ width: { size: LARGEUR, type: WidthType.DXA }, columnWidths: larg, rows }), new Paragraph({ children: [], spacing: { after: 80 } })];
}

function encadre(b) {
  const bord = { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 6 };
  const base = { shading: { type: ShadingType.CLEAR, fill: b.couleur, color: 'auto' }, border: { top: bord, bottom: bord, left: bord, right: bord }, indent: { left: 140, right: 140 } };
  const out = [new Paragraph({ ...base, keepNext: true, spacing: { before: 120, after: 0 }, children: [run(b.titre, { bold: true, color: NAVY })] })];
  b.textes.forEach((t, i) => out.push(new Paragraph({ ...base, keepNext: i < b.textes.length - 1, spacing: { after: i === b.textes.length - 1 ? 140 : 0 }, children: [run(t)] })));
  return out;
}

function code(b) {
  const out = [new Paragraph({ keepNext: true, spacing: { before: 100, after: 0 }, shading: { type: ShadingType.CLEAR, fill: '1C3343', color: 'auto' },
    children: [run(' ' + b.titre, { bold: true, color: 'FFFFFF', size: 17 })] })];
  b.lignes.forEach((l, i) => out.push(new Paragraph({ spacing: { after: 0, line: 240, lineRule: LineRuleType.AUTO }, keepLines: true,
    shading: { type: ShadingType.CLEAR, fill: 'F1F4F6', color: 'auto' },
    children: [new TextRun({ text: ' ' + (l === '' ? ' ' : l), font: 'Courier New', size: 16 })] })));
  out.push(new Paragraph({ children: [], spacing: { after: 100 } }));
  return out;
}

function image(b) {
  const out = [new Paragraph({ alignment: AlignmentType.CENTER, keepNext: !!b.legende, spacing: { before: 100, after: 40, line: 240, lineRule: LineRuleType.AUTO },
    children: [new ImageRun({ type: b.type, data: fs.readFileSync(b.chemin), transformation: { width: b.l, height: b.h },
      altText: { title: b.legende || 'figure', description: b.legende || 'figure', name: path.basename(b.chemin) } })] })];
  if (b.legende) out.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 160 }, children: [run(b.legende, { italics: true, size: 17, color: GREY })] }));
  return out;
}

function bloc(b) {
  switch (b.t) {
    case 'titre': return [new Paragraph({ heading: HeadingLevel.TITLE, spacing: { before: 1200, after: 200 }, children: [run(b.texte)] })];
    case 'soustitre': return [new Paragraph({ spacing: { after: 300 }, children: [run(b.texte, { size: 30, bold: true, color: TEAL })] })];
    case 'h1': return [new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: !!b.saut, children: [run(b.texte)] })];
    case 'h2': return [new Paragraph({ heading: HeadingLevel.HEADING_2, children: [run(b.texte)] })];
    case 'h3': return [new Paragraph({ heading: HeadingLevel.HEADING_3, children: [run(b.texte)] })];
    case 'p': return para(b);
    case 'puces': return b.items.map(x => new Paragraph({ numbering: { reference: 'puces', level: 0 }, spacing: { after: 60 }, children: [run(x)] }));
    case 'numeros': return b.items.map((x, i) => new Paragraph({ spacing: { after: 60 }, indent: { left: 440, hanging: 340 }, children: [run((i + 1) + '.\t', { bold: true, color: TEAL }), run(x)],
      tabStops: [{ type: 'left', position: 440 }] }));
    case 'choix': return b.items.map(x => new Paragraph({ spacing: { after: 40 }, indent: { left: 360 }, children: [run('☐  ' + x)] }));
    case 'table': return table(b);
    case 'encadre': return encadre(b);
    case 'code': return code(b);
    case 'image': return image(b);
    case 'lignes': {
      const out = [];
      for (let i = 0; i < b.n; i++) out.push(new Paragraph({ spacing: { before: 300, after: 0 }, border: { bottom: { style: BorderStyle.DOTTED, size: 6, color: '9AAAB4', space: 1 } }, children: [] }));
      out.push(new Paragraph({ children: [], spacing: { after: 120 } }));
      return out;
    }
    case 'saut': return [new Paragraph({ children: [new PageBreak()] })];
    default: throw new Error('bloc inconnu ' + b.t);
  }
}

async function construire(fichierJson) {
  const m = JSON.parse(fs.readFileSync(path.join(SRC, fichierJson), 'utf8'));
  // Un saut de page suivi d'un titre de niveau 1 devient « saut de page avant » ce titre (évite les pages blanches).
  const blocs = [];
  m.blocs.forEach((b, i) => {
    if (b.t === 'saut' && m.blocs[i + 1] && m.blocs[i + 1].t === 'h1') { m.blocs[i + 1].saut = true; return; }
    if (b.t === 'saut' && i === m.blocs.length - 1) return;
    blocs.push(b);
  });
  const enfants = blocs.flatMap(bloc);
  const doc = new Document({
    creator: 'Fehmi KLABI', title: m.titre, description: 'ASTROTECH — parcours astronomie et technologies, CM1 à 3e',
    styles: {
      default: { document: { run: { font: FONT, size: 21 }, paragraph: { spacing: { line: 276, lineRule: LineRuleType.AUTO } } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal', next: 'Normal', run: { font: FONT, size: 56, bold: true, color: NAVY }, paragraph: { spacing: { before: 1200, after: 200 }, keepNext: true } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 32, bold: true, color: NAVY }, paragraph: { spacing: { before: 320, after: 140 }, keepNext: true, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 25, bold: true, color: TEAL }, paragraph: { spacing: { before: 240, after: 100 }, keepNext: true, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 22, bold: true, color: RUST }, paragraph: { spacing: { before: 200, after: 80 }, keepNext: true, outlineLevel: 2 } },
      ],
    },
    numbering: { config: [{ reference: 'puces', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 440, hanging: 300 } } } }] }] },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1020, bottom: 1020, left: 1020, right: 1020 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(m.entete, { size: 16, color: GREY })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
        run('Page ', { size: 16, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GREY }),
        run(' sur ', { size: 16, color: GREY }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: GREY })] })] }) },
      children: enfants,
    }],
  });
  const cible = path.join(dossierCible(m.fichier), m.fichier + '.docx');
  fs.writeFileSync(cible, await Packer.toBuffer(doc));
  return cible;
}

(async () => {
  const fichiers = fs.readdirSync(SRC).filter(f => f.endsWith('.json')).sort();
  for (const f of fichiers) console.log('écrit', path.relative(SITE, await construire(f)));
})().catch(e => { console.error(e); process.exit(1); });
