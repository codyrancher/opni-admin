export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function delayRandom(minMs: number, maxMs: number) {
  const ms = Math.random() * (maxMs - minMs) + minMs;

  return delay(ms);
}
