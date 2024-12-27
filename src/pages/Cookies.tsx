import React from 'react';
import { Helmet } from 'react-helmet';

const Cookies = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - BackgroundBegone | AI Background Removal Tool</title>
        <meta name="description" content="Learn about how BackgroundBegone uses cookies to enhance your experience with our AI-powered background removal tool. Transparent cookie policy and privacy information." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://backgroundbegone.com/cookies" />
      </Helmet>
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 gradient-text">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
              They help us make our website work better and provide you with a more personalized experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Essential cookies: Required for the website to function properly</li>
              <li>Analytics cookies: Help us understand how visitors interact with our website</li>
              <li>Preference cookies: Remember your settings and preferences</li>
              <li>Performance cookies: Enhance the speed and performance of our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p>These cookies are necessary for the website to function and cannot be switched off in our systems.</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p>These cookies enable the website to provide enhanced functionality and personalization.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="mb-4">
              Most web browsers allow you to control cookies through their settings preferences. 
              However, limiting cookies may impact your experience using our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at:
              <br />
              Email: support@backgroundbegone.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Cookies;