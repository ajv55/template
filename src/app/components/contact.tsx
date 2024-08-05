// components/ContactSection.tsx
const ContactSection = () => {
    return (
      <section id="contact" className="py-16 bg-indigo-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-6">We&#39;d love to hear from you. Reach out to us!</p>
          <a
            href="mailto:contact@mysite.com"
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition"
          >
            Email Us
          </a>
        </div>
      </section>
    );
  };
  
  export default ContactSection;
  