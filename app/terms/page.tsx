export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-r from-background to-foreground/10">
      <main className="flex-grow">
        <section className=" py-20 w-full h-full">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide mb-4 text-balance">Terms of Use</h1>
            <p className="text-sm text-gray-600 mb-4">Last updated: 10/10/2024</p>
            <div className="text-left px-4 w-full max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Welcome to <strong>publicbuilders.org</strong>. By accessing or using our website, you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please
                refrain from using our site.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Use of Our Website</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                <strong>publicbuilders.org</strong> provides a platform for sharing public profiles of builders in the tech community. You may use our site for personal and non-commercial purposes,
                provided you agree not to:
              </p>
              <ul className="list-disc list-inside mb-6 text-gray-700 leading-relaxed">
                <li>Violate any applicable laws or regulations.</li>
                <li>Post or transmit any harmful, defamatory, or infringing content.</li>
                <li>Attempt to interfere with the functionality or security of our site.</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4">Account and Profile Submissions</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                When you submit your profile to <strong>publicbuilders.org</strong>, you are responsible for providing accurate and truthful information. We reserve the right to review, approve, or
                reject any submissions at our discretion. If your profile is accepted, it will be publicly displayed on our site.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Content Ownership</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                You retain ownership of any content you submit to <strong>publicbuilders.org</strong>. By submitting your profile, you grant us a non-exclusive, worldwide, royalty-free license to
                display, distribute, and promote your content as part of our service. You represent and warrant that you have the right to grant this license and that your content does not infringe on
                the rights of others.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                The content and materials provided on <strong>publicbuilders.org</strong>, including text, graphics, logos, and software, are the property of <strong>publicbuilders.org</strong> or its
                content creators and are protected by copyright and other intellectual property laws. Unauthorized use of our content is prohibited.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. These links are provided for your convenience only, and we are not responsible for the content or privacy practices of these
                external sites. We encourage you to review the terms and policies of any third-party websites you visit.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                <strong>publicbuilders.org</strong> is provided “as is” without any warranties, express or implied. We do not guarantee the accuracy, completeness, or reliability of any content on our
                site. You use our website at your own risk.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                In no event shall <strong>publicbuilders.org</strong>, its owners, or affiliates be liable for any direct, indirect, incidental, or consequential damages arising from your use of our
                website or your inability to access it.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Termination</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                We reserve the right to terminate or suspend access to <strong>publicbuilders.org</strong> at our discretion, without notice, for conduct that violates these Terms of Use or is
                otherwise harmful to our interests or the interests of others.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                We may update these Terms of Use from time to time. Any changes will be posted on this page, with an updated revision date. By continuing to use <strong>publicbuilders.org</strong>{" "}
                after any changes become effective, you agree to be bound by the updated Terms of Use.
              </p>

              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-6 text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Use, please contact us at{" "}
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
