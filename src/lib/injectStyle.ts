/**
 * Inject a <style> block into <head> once per id. Repeat calls with the
 * same id are no-ops, so individual animation modules can call this
 * from `render()` without leaking duplicate styles between mounts.
 */
export function injectStyle(id: string, css: string): void {
  if (document.getElementById(id)) return;
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
}
