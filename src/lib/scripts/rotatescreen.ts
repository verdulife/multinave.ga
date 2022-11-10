import type { Device } from '$lib/types';

export function rotateScreen(device: Device) {
  const { width, height } = device.size;

  device.size = {
    width: height,
    height: width
  };
}