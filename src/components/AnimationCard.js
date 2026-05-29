import { EASING_PRESETS, bezierToCss } from '../lib/easings';
import { copyToClipboard } from '../lib/copyClipboard';
const PLATFORMS = [
    { id: 'web', label: 'Web · CSS (LG, Samsung)' },
    { id: 'android', label: 'Android TV · Compose' },
    { id: 'ios', label: 'iOS / tvOS · SwiftUI' },
    { id: 'roku', label: 'Roku · SceneGraph' },
];
export function createAnimationCard(anim) {
    const easingInitial = EASING_PRESETS.find((e) => e.id === anim.defaults.easingId) ?? EASING_PRESETS[0];
    const state = {
        duration: anim.defaults.duration,
        easing: easingInitial,
    };
    let activePlatform = 'web';
    const root = document.createElement('div');
    root.innerHTML = `
    <header class="page-header">
      <div class="page-header__eyebrow">${anim.game}</div>
      <h1 class="page-header__title">${anim.title}</h1>
      <p class="page-header__desc">${anim.description}</p>
    </header>

    <div class="anim-card">
      <div class="anim-stage" data-role="stage"></div>

      ${anim.frames && anim.frames.length > 0 ? `
        <div class="frames-grid" data-role="frames">
          ${anim.frames.map((f, idx) => `
            <div class="frame">
              <div class="frame__slot" data-frame-idx="${idx}"></div>
              <div class="frame__label">${f.label}</div>
              ${f.sublabel ? `<div class="frame__sublabel">${f.sublabel}</div>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div class="actions">
        <button class="btn btn--primary" data-role="play">▶ Replay</button>
        <button class="btn" data-role="slow">⏱ Slow</button>
        <button class="btn" data-role="reset">Reset to defaults</button>
        <span style="flex:1"></span>
        <button class="btn" data-role="copy-snippet">Copy current snippet</button>
        <button class="btn" data-role="copy-pm">Copy description</button>
      </div>

      <div class="info-grid">
        <div class="info-grid__col">
          <h3 class="section__title">Description</h3>
          <div class="pm-block" data-role="pm-output"></div>
        </div>
        <div class="info-grid__col">
          <h3 class="section__title">Controls</h3>
          <div class="anim-controls">
            <div class="control">
              <div class="control__label">Duration</div>
              <div class="control__row">
                <input type="range" min="100" max="2000" step="10" value="${state.duration}" data-role="duration" />
                <div class="control__value" data-role="duration-value">${state.duration} ms</div>
              </div>
            </div>

            <div class="control">
              <div class="control__label">Easing preset</div>
              <select data-role="easing-preset" style="width:100%">
                ${EASING_PRESETS.map((e) => `<option value="${e.id}" ${e.id === state.easing.id ? 'selected' : ''}>${e.label}</option>`).join('')}
              </select>
            </div>

            <div class="control">
              <div class="control__label">Custom cubic-bezier</div>
              <div class="bezier-inputs">
                ${state.easing.bezier.map((v, i) => `<input type="number" step="0.01" value="${v}" data-role="bezier-${i}" />`).join('')}
              </div>
              <div class="control__hint" data-role="easing-desc">${state.easing.description}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs" role="tablist">
        ${PLATFORMS.map((p) => `
          <button type="button" class="tab ${p.id === activePlatform ? 'is-active' : ''}" role="tab" data-platform="${p.id}">${p.label}</button>
        `).join('')}
      </div>

      <div class="code-block" data-role="snippet-output"></div>
    </div>
  `;
    const stage = root.querySelector('[data-role=stage]');
    const playBtn = root.querySelector('[data-role=play]');
    const slowBtn = root.querySelector('[data-role=slow]');
    const resetBtn = root.querySelector('[data-role=reset]');
    const copySnippetBtn = root.querySelector('[data-role=copy-snippet]');
    const copyPmBtn = root.querySelector('[data-role=copy-pm]');
    const durationInput = root.querySelector('[data-role=duration]');
    const durationValue = root.querySelector('[data-role=duration-value]');
    const easingPreset = root.querySelector('[data-role=easing-preset]');
    const easingDesc = root.querySelector('[data-role=easing-desc]');
    const bezierInputs = [0, 1, 2, 3].map((i) => root.querySelector(`[data-role=bezier-${i}]`));
    const snippetOutput = root.querySelector('[data-role=snippet-output]');
    const pmOutput = root.querySelector('[data-role=pm-output]');
    const tabButtons = Array.from(root.querySelectorAll('.tab'));
    const cleanup = anim.render(stage);
    function syncBezierInputs() {
        state.easing.bezier.forEach((v, i) => { bezierInputs[i].value = String(v); });
    }
    function refreshOutputs() {
        const snippets = anim.snippets(state);
        snippetOutput.textContent = snippets[activePlatform];
        pmOutput.textContent = anim.pmTicket();
        tabButtons.forEach((b) => {
            b.classList.toggle('is-active', b.dataset.platform === activePlatform);
        });
    }
    function selectPreset(p) {
        state.easing = { ...p };
        easingDesc.textContent = p.description;
        syncBezierInputs();
        refreshOutputs();
        if (!anim.tbd)
            anim.play(state);
    }
    function applyBezierFromInputs() {
        const vals = bezierInputs.map((inp) => Number(inp.value));
        if (vals.some((v) => Number.isNaN(v)))
            return;
        state.easing = {
            id: 'custom',
            label: `Custom (${vals.join(', ')})`,
            bezier: vals,
            description: `cubic-bezier(${vals.join(', ')})`,
        };
        if (!easingPreset.querySelector('option[value="custom"]')) {
            const opt = document.createElement('option');
            opt.value = 'custom';
            opt.textContent = 'Custom…';
            easingPreset.appendChild(opt);
        }
        easingPreset.value = 'custom';
        easingDesc.textContent = `cubic-bezier(${vals.join(', ')}) — ${bezierToCss(vals)}`;
        refreshOutputs();
        if (!anim.tbd)
            anim.play(state);
    }
    // Render storyboard frames (if any).
    if (anim.frames && anim.frames.length > 0) {
        anim.frames.forEach((f, idx) => {
            const slot = root.querySelector(`[data-frame-idx="${idx}"]`);
            if (slot)
                f.render(slot);
        });
    }
    // ---- Events ----------------------------------------------------------------
    playBtn.addEventListener('click', () => { if (!anim.tbd)
        anim.play(state); });
    slowBtn.addEventListener('click', () => {
        if (anim.tbd)
            return;
        const factor = anim.slowFactor ?? 4;
        const slowed = { ...state, duration: state.duration * factor };
        anim.play(slowed);
    });
    resetBtn.addEventListener('click', () => {
        const preset = EASING_PRESETS.find((e) => e.id === anim.defaults.easingId) ?? EASING_PRESETS[0];
        state.duration = anim.defaults.duration;
        durationInput.value = String(state.duration);
        durationValue.textContent = `${state.duration} ms`;
        easingPreset.value = preset.id;
        selectPreset(preset);
    });
    durationInput.addEventListener('input', () => {
        state.duration = Number(durationInput.value);
        durationValue.textContent = `${state.duration} ms`;
        refreshOutputs();
        if (!anim.tbd)
            anim.play(state);
    });
    easingPreset.addEventListener('change', () => {
        const preset = EASING_PRESETS.find((e) => e.id === easingPreset.value);
        if (preset)
            selectPreset(preset);
    });
    bezierInputs.forEach((inp) => inp.addEventListener('change', applyBezierFromInputs));
    tabButtons.forEach((b) => {
        b.addEventListener('click', () => {
            activePlatform = b.dataset.platform;
            refreshOutputs();
        });
    });
    copySnippetBtn.addEventListener('click', () => {
        const text = anim.snippets(state)[activePlatform];
        copyToClipboard(text, copySnippetBtn, 'Copy current snippet');
    });
    copyPmBtn.addEventListener('click', () => {
        copyToClipboard(anim.pmTicket(), copyPmBtn, 'Copy description');
    });
    refreshOutputs();
    if (!anim.tbd)
        requestAnimationFrame(() => anim.play(state));
    root.__destroy = () => { cleanup(); };
    return root;
}
