export async function copyToClipboard(text: string, button: HTMLButtonElement, originalLabel: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for non-https contexts
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
  button.classList.add('btn--copied');
  button.textContent = 'Copied!';
  setTimeout(() => {
    button.classList.remove('btn--copied');
    button.textContent = originalLabel;
  }, 1400);
}
