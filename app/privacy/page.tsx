export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-background to-foreground/10">
      <main className="flex-grow">
        <section className=" py-20 w-full h-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 text-balance">Privacy Policy</h1>
            <p className="text-sm text-gray-600 mb-4">Last updated: 10/10/2024</p>
            <div className="text-left px-4 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Welcome to <strong>publicbuilders.org</strong>! Your privacy is of utmost importance to us. This Privacy Policy explains how we collect, use, and protect your personal information when
                you use our website.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">We may collect the following types of information:</p>
              <ul className="list-disc ml-6 mb-6 text-gray-700 leading-relaxed">
                <li>
                  <strong>Personal Information:</strong> When you create a profile, submit information to join our platform, or interact with other builders, we may collect your name, email address,
                  social media handles, and any other information you choose to provide.
                </li>
                <li>
                  <strong>Usage Data:</strong> We may collect information on how you interact with our website, such as pages visited, time spent on pages, and any errors encountered.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Your information helps us operate and improve <strong>publicbuilders.org</strong>. Specifically, we may use it to:
              </p>
              <ul className="list-disc ml-6 mb-6 text-gray-700 leading-relaxed">
                <li>Enable you to create and manage your public builder profile.</li>
                <li>Feature builders who choose to participate in public profiles.</li>
                <li>Respond to your inquiries, feedback, and requests.</li>
                <li>Improve website functionality and user experience.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. However, we may share your information:</p>
              <ul className="list-disc ml-6 mb-6 text-gray-700 leading-relaxed">
                <li>With service providers who help us operate our website, provided they agree to keep your information secure and confidential.</li>
                <li>To comply with legal obligations, such as responding to lawful requests from public authorities.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                <strong>publicbuilders.org</strong> may use cookies to enhance your experience on our website. Cookies help us remember your preferences and understand how users interact with our
                site. You can disable cookies through your browser settings, though this may affect the functionality of certain features.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                over the Internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee its absolute security.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Depending on your jurisdiction, you may have the right to access, correct, or delete your personal information, as well as to restrict or object to its processing. To exercise these
                rights, please contact us at{" "}
                <strong>
                  <a href="https://github.com/johnnybuildsyo/publicbuilders/discussions">github.com/johnnybuildsyo/publicbuilders/discussions</a>
                </strong>
                .
              </p>

              <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page, with an updated revision date. By continuing to use <strong>publicbuilders.org</strong>{" "}
                after any changes become effective, you agree to be bound by the updated Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <strong>
                  <a href="https://github.com/johnnybuildsyo/publicbuilders/discussions">github.com/johnnybuildsyo/publicbuilders/discussions</a>
                </strong>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
