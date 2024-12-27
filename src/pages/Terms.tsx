const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <div className="prose prose-blue max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>By accessing and using BackgroundBegone, you agree to be bound by these Terms of Service.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Service Description</h2>
        <p>BackgroundBegone provides an online tool for removing backgrounds from images using AI technology.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>You must only upload images you have the right to use</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You agree not to misuse or abuse our service</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Intellectual Property</h2>
        <p>You retain all rights to your images. We do not claim ownership of any content you upload.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Limitations of Liability</h2>
        <p>BackgroundBegone is provided "as is" without any warranties, express or implied.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact</h2>
        <p>For any questions regarding these terms, please contact:</p>
        <p>Email: legal@backgroundbegone.com</p>
      </div>
    </div>
  );
};

export default Terms;