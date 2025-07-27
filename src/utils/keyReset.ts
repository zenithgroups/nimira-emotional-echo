// Utility to reset API key manager for troubleshooting
export const resetAPIKeyManager = () => {
  // Clear localStorage data for API key manager
  localStorage.removeItem('openai_key_usage');
  
  // Force reload the page to reinitialize the manager
  window.location.reload();
};

// Call this function from console if needed for debugging
if (typeof window !== 'undefined') {
  (window as any).resetAPIKeys = resetAPIKeyManager;
}