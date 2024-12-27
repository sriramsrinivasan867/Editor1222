const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-blue max-w-none">
        <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <p>When you use BackgroundBegone, we collect the following types of information:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Images you upload for processing</li>
          <li>Usage data and analytics</li>
          <li>Technical information about your device and browser</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>Process your images and remove backgrounds</li>
          <li>Improve our services</li>
          <li>Provide customer support</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Data Security</h2>
        <p>We implement appropriate security measures to protect your data. Your images are processed securely and deleted from our servers after processing.</p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: privacy@backgroundbegone.com</p>
      </div>
    </div>
  );
};

export default Privacy;