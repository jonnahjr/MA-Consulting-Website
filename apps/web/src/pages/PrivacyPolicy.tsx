import Meta from '../components/Meta'

export function PrivacyPolicy() {
  return (
    <>
      <Meta
        title="Privacy Policy - Ma Services Solution"
        description="Learn how Ma Services Solution collects, uses, and protects your personal information. Our comprehensive privacy policy explains our data practices and your rights."
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
              <p className="text-xl text-gray-600">How we collect, use, and protect your information</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At Ma Services Solution, we are committed to protecting your privacy and ensuring the security of your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website,
                  use our services, or interact with us.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We value your trust and are dedicated to maintaining the confidentiality and security of your personal data in accordance
                  with applicable Ethiopian data protection laws and international best practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Personal Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We may collect personal information that you provide directly to us, including:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                      <li>Name, email address, and contact information</li>
                      <li>Business information and company details</li>
                      <li>Professional background and experience</li>
                      <li>Communication preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Usage Information</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We automatically collect certain information when you visit our website:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-3 space-y-2">
                      <li>IP address and location data</li>
                      <li>Browser type and version</li>
                      <li>Pages visited and time spent on our site</li>
                      <li>Referral sources</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Cookies and Tracking Technologies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We use cookies and similar technologies to enhance your browsing experience and analyze site usage.
                      See our Cookie Policy for detailed information.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide consulting services and respond to inquiries</li>
                  <li>Communicate with you about our services and updates</li>
                  <li>Improve our website and service offerings</li>
                  <li>Conduct research and analysis for business development</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist our operations (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your personal data</li>
                  <li>Restriction of processing</li>
                  <li>Data portability</li>
                  <li>Objection to processing</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
                  alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments.
                  However, no method of transmission over the internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@maservices.com</p>
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