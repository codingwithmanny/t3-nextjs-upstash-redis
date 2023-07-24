// Imports
// ========================================================
// Root Provider
// ========================================================
const MobileProvider = ({ children }: { children: React.ReactNode }) => {
  return <>
    {children}
    <div className="flex items-center justify-center md:hidden fixed inset-0 bg-slate-200">
      <div className="text-center">
      <h5>Mobile Support Coming</h5>
      <p>Mobile is not currently supported, but coming soon.</p>
      </div>
    </div>
  </>
};

export default MobileProvider;