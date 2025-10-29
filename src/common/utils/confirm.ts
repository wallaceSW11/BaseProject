export {};

// Global confirm function for easy access
// Note: This extends Window with a custom confirm method
// The native window.confirm is still available
declare global {
  interface Window {
    confirmDialog?: (message: string, title?: string) => Promise<boolean>;
  }
}
