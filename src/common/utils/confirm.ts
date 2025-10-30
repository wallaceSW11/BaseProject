export {};

declare global {
  interface Window {
    confirmDialog?: (message: string, title?: string) => Promise<boolean>;
  }
}
