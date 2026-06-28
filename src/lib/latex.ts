// Minimal LaTeX → HTML/text cleaner, scoped to the constructs that actually
// appear in bibdesk-database.bib (BibDesk export). Not a general TeX engine:
// it covers accents, a little inline maths, small markup macros, and dashes.

const ACCENTS: Record<string, Record<string, string>> = {
  '"': { a: 'ä', e: 'ë', i: 'ï', o: 'ö', u: 'ü', A: 'Ä', O: 'Ö', U: 'Ü' },
  "'": { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', n: 'ń', c: 'ć', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' },
  '`': { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', A: 'À', E: 'È', O: 'Ò' },
  '^': { a: 'â', e: 'ê', i: 'î', o: 'ô', u: 'û' },
  '~': { n: 'ñ', a: 'ã', o: 'õ', N: 'Ñ' },
};

const GREEK: Record<string, string> = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε',
  theta: 'θ', lambda: 'λ', mu: 'μ', pi: 'π', sigma: 'σ', phi: 'φ', omega: 'ω',
  Gamma: 'Γ', Delta: 'Δ', Lambda: 'Λ', Sigma: 'Σ', Phi: 'Φ', Omega: 'Ω',
};

function applyAccents(s: string): string {
  // \i (dotless i) → i, so the acute/diaeresis maps below catch it
  s = s.replace(/\\i\b/g, 'i');
  const sub = (_m: string, acc: string, ch: string) =>
    (ACCENTS[acc] && ACCENTS[acc][ch]) || ch;
  s = s.replace(/\{\\(["'`^~])\{?([A-Za-z])\}?\}/g, sub); // {\"o}, {\'\i}
  s = s.replace(/\\(["'`^~])\{?([A-Za-z])\}?/g, sub); //  \"o, \'a
  return s;
}

function applyMath(s: string): string {
  return s.replace(/\$([^$]*)\$/g, (_m, inner: string) => {
    let t = inner;
    t = t.replace(/\\([A-Za-z]+)/g, (m, name: string) => GREEK[name] ?? m);
    t = t.replace(/\^\{([^}]*)\}/g, '<sup>$1</sup>');
    t = t.replace(/\^(\w)/g, '<sup>$1</sup>');
    t = t.replace(/_\{([^}]*)\}/g, '<sub>$1</sub>');
    t = t.replace(/_(\w)/g, '<sub>$1</sub>');
    return t;
  });
}

/** Full clean to an HTML-safe fragment (keeps <sub>/<sup>/<em>). */
export function latexToHtml(input?: string): string {
  if (!input) return '';
  let s = input;
  s = applyAccents(s);
  s = applyMath(s);
  s = s.replace(/\\textsubscript\{([^}]*)\}/g, '<sub>$1</sub>');
  s = s.replace(/\\textsuperscript\{([^}]*)\}/g, '<sup>$1</sup>');
  s = s.replace(/\\(?:emph|textit)\{([^}]*)\}/g, '<em>$1</em>');
  s = s.replace(/\\textsc\{([^}]*)\}/g, (_m, t: string) => t.toUpperCase());
  s = s.replace(/\\texttt\{([^}]*)\}/g, '$1');
  s = s.replace(/\\href\{[^}]*\}\{([^}]*)\}/g, '$1');
  s = s.replace(/\\&/g, '&amp;').replace(/&(?!amp;|lt;|gt;|#)/g, '&amp;');
  s = s.replace(/---/g, '—').replace(/--/g, '–');
  s = s.replace(/[~]/g, ' ').replace(/\\[,;: ]/g, ' ');
  s = s.replace(/[{}]/g, ''); // drop remaining grouping braces
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

/** Plain text (no tags) — for attributes and sorting keys. */
export function latexToText(input?: string): string {
  return latexToHtml(input)
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .trim();
}
