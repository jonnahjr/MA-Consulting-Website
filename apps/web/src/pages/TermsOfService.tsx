import Meta from '../components/Meta'

export function TermsOfService() {
  return (
    <>
      <Meta
        title="Terms of Service - Ma Services Solution"
        description="Read our terms of service to understand the rules and responsibilities for using Ma Services Solution's website and consulting services."
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
              <p className="text-xl text-gray-600">Rules and responsibilities for using our services</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using Ma Services Solution's website and services, you accept and agree to be bound by the terms
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">User Responsibilities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">As a user of our services, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and complete information when requesting our services</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not engage in any activity that could harm our systems or other users</li>
                  <li>Maintain the confidentiality of any sensitive information shared</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ma Services Solution provides professional consulting services including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Investment consulting and financial advisory</li>
                  <li>Business development and strategic planning</li>
                  <li>Tax optimization and customs consulting</li>
                  <li>Marketing strategy and implementation</li>
                  <li>Development works and project management</li>
                  <li>Dedicated business support services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed">
                  All content, features, and functionality of our website and services, including but not limited to text,
                  graphics, logos, and software, are owned by Ma Services Solution and are protected by Ethiopian and
                  international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ma Services Solution shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of our services. Our total liability shall not exceed the amount paid for our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Confidentiality</h2>
                <p className="text-gray-700 leading-relaxed">
                  Both parties agree to maintain the confidentiality of all proprietary or sensitive information disclosed
                  during the course of our professional relationship. This includes business strategies, financial data,
                  and client information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of the Federal Democratic
                  Republic of Ethiopia. Any disputes arising from these terms shall be resolved through the appropriate
                  Ethiopian courts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  Either party may terminate this agreement at any time. Upon termination, all rights and obligations
                  under these terms shall cease, except for provisions that by their nature should survive termination,
                  such as confidentiality and limitation of liability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700"><strong>Email:</strong> legal@maservices.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +251 911 123 456</p>
                  <p className="text-gray-700"><strong>Address:</strong> Addis Ababa, Ethiopia</p>
                </div>
              </section>

              <section className="border-t pt-8">
                <p className="text-sm text-gray-500 text-center">
                  Last updated: October 10, 2024
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}