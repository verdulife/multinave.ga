export function scale(viewRight: Boolean, container: HTMLElement, frame: HTMLIFrameElement): number {
  const { clientWidth: containerWidth, clientHeight: containerHeight } = container;
  const { clientWidth: frameWidth, clientHeight: frameHeight } = frame;

  const containerRatio = containerWidth / containerHeight;
  const frameRatio = frameWidth / frameHeight;
  const ratio = containerRatio - frameRatio;
  const padding: number = frameWidth > frameHeight ? 150 : 270;

  if (viewRight) {
    return (containerHeight - padding) / frameHeight;
  }

  if (frameHeight / ratio > containerHeight) {
    return (containerHeight - padding) / frameHeight;
  }

  return (containerWidth - padding) / frameWidth;
}