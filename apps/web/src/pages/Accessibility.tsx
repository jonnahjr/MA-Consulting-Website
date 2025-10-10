import Meta from '../components/Meta'

export function Accessibility() {
  return (
    <>
      <Meta
        title="Accessibility Statement - Ma Services Solution"
        description="Ma Services Solution is committed to making our website accessible to everyone. Learn about our accessibility measures and how we ensure an inclusive experience."
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
              <p className="text-xl text-gray-600">Our commitment to inclusive digital experiences</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Accessibility Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Ma Services Solution, we believe that everyone should have equal access to our website and services,
                  regardless of ability or disability. We are committed to ensuring our digital presence is accessible
                  to all users, including those with visual, auditory, motor, or cognitive impairments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Accessibility Measures</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We have implemented various measures to ensure our website meets accessibility standards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                    <h3 className="text-xl font-semibold text-amber-800 mb-3">WCAG Compliance</h3>
                    <p className="text-amber-700">
                      Our website follows Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards,
                      ensuring compatibility with assistive technologies.
                    </p>
                  </div>

                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Screen Reader Support</h3>
                    <p className="text-blue-700">
                      All content is compatible with popular screen readers including JAWS, NVDA, and VoiceOver.
                    </p>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Keyboard Navigation</h3>
                    <p className="text-green-700">
                      Full keyboard navigation support allows users to navigate our site without a mouse.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Alt Text & Captions</h3>
                    <p className="text-purple-700">
                      All images include descriptive alt text, and multimedia content has captions and transcripts.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Features for Accessibility</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-3">
                  <li><strong>High Contrast:</strong> Sufficient color contrast ratios for readability</li>
                  <li><strong>Resizable Text:</strong> Text can be enlarged up to 200% without loss of functionality</li>
                  <li><strong>Clear Navigation:</strong> Logical page structure with descriptive headings</li>
                  <li><strong>Error Prevention:</strong> Clear error messages and form validation</li>
                  <li><strong>Consistent Layout:</strong> Predictable navigation and page layouts</li>
                  <li><strong>Focus Indicators:</strong> Visible focus indicators for keyboard users</li>
                  <li><strong>Language Identification:</strong> Proper language attributes for screen readers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Assistance Technologies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website is designed to work with various assistive technologies:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                  <li>Braille displays</li>
                  <li>Screen magnification software</li>
                  <li>Speech recognition software</li>
                  <li>Alternative input devices</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact for Accessibility Issues</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you encounter any accessibility barriers on our website or need assistance, please don't hesitate to contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> accessibility@maservices.com</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +251 911 123 456</p>
                  <p className="text-gray-700 mb-4"><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM EAT</p>
                  <p className="text-gray-600 text-sm">
                    We aim to respond to accessibility concerns within 2 business days and will work to resolve issues promptly.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Continuous Improvement</h2>
                <p className="text-gray-700 leading-relaxed">
                  Accessibility is an ongoing commitment. We regularly audit our website, conduct user testing with people
                  with disabilities, and implement improvements based on feedback and technological advancements.
                  Our goal is to maintain WCAG 2.1 Level AA compliance and exceed industry standards where possible.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Feedback Welcome</h2>
                <p className="text-gray-700 leading-relaxed">
                  We value your feedback on our accessibility efforts. If you have suggestions for improvement or
                  experience any difficulties accessing our content, please let us know. Your input helps us
                  create a better experience for everyone.
                </p>
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