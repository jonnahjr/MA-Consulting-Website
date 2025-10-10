import Meta from '../components/Meta'

export function CookiePolicy() {
  return (
    <>
      <Meta
        title="Cookie Policy - Ma Services Solution"
        description="Learn about how Ma Services Solution uses cookies and tracking technologies on our website. Understand your options for managing cookies."
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
              <p className="text-xl text-gray-600">How we use cookies and tracking technologies</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What Are Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website.
                  They allow us to remember your preferences, analyze site usage, and provide a better browsing experience.
                  Cookies cannot access your personal files or harm your device.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why We Use Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We use cookies for the following purposes:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      These cookies are necessary for our website to function and cannot be disabled. They include cookies
                      that enable core functionality such as security, network management, and accessibility.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Analytics Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We use Google Analytics to understand how our website is used. This helps us improve our services
                      and user experience. These cookies collect information anonymously.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Functional Cookies</h3>
                    <p className="text-gray-700 leading-relaxed">
                      These cookies remember your preferences, such as language settings and location, to provide a
                      more personalized experience on our website.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Some cookies may be set by third-party services that appear on our pages. We have no control over these
                  cookies, and they are subject to the respective third party's privacy policy.
                </p>
                <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl">
                  <h3 className="text-xl font-semibold text-amber-800 mb-2">Third-Party Services</h3>
                  <ul className="text-amber-700 space-y-1">
                    <li>• Google Analytics (website analytics)</li>
                    <li>• Social media platforms (sharing functionality)</li>
                    <li>• Customer support chat widgets</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Managing Your Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You can control and manage cookies in various ways. Most web browsers allow you to control cookies
                  through their settings. You can usually find these settings in the 'Options' or 'Preferences' menu.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Browser Settings</h3>
                    <p className="text-gray-700">
                      You can set your browser to block or alert you about cookies, but please note that some parts
                      of our site may not work properly without cookies.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Opt-out Options</h3>
                    <p className="text-gray-700">
                      For analytics cookies, you can opt out by visiting the Google Analytics opt-out page or using
                      browser extensions that block tracking.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Consent</h2>
                <p className="text-gray-700 leading-relaxed">
                  By using our website, you consent to the use of cookies as described in this policy. You can withdraw
                  your consent at any time by changing your browser settings or contacting us directly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="text-gray-700"><strong>Email:</strong> privacy@maservices.com</p>
                  <p className="text-gray-700"><strong>Phone:</strong> +251 911 123 456</p>
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