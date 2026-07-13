import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps the AJA brand system in the landing page", async () => {
  const [page, css, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/globals.css", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(layout, /AJA - Presença intencional/);
  assert.match(page, /Seu cheiro/);
  assert.match(page, /AJA com intenção/);
  assert.match(page, /7 decants/);
  assert.match(css, /Cormorant Garamond/);
  assert.match(css, /Tenor Sans/);
  assert.match(css, /--terra:#B5532A/);
  assert.doesNotMatch(css, /radial-gradient/);
});

test("uses all three quiz inputs and communicates prototype limits", async () => {
  const page = await readFile(new URL("app/page.tsx", root), "utf8");

  assert.match(page, /\$\{answers\.mood\}\|\$\{answers\.moment\}\|\$\{answers\.intensity\}/);
  assert.match(page, /firmeza\|dia\|discreta/);
  assert.match(page, /firmeza\|dia\|marcante/);
  assert.match(page, /dados não são enviados nesta demonstração/);
  assert.match(page, /integração de envio será ativada antes do lançamento/);
});
