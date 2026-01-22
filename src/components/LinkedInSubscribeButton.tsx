'use client';

export default function LinkedInSubscribeButton() {
  return (
    <div className="mt-12 pt-8 border-t border-gray-700 text-center">
      <p className="text-gray-300 mb-6">
        Enjoyed this episode? Subscribe to receive daily insights on AI accountability.
      </p>
      <style jsx>{`
        .libutton {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 7px;
          text-align: center;
          outline: none;
          text-decoration: none !important;
          color: #ffffff !important;
          width: 200px;
          height: 32px;
          border-radius: 16px;
          background-color: #0A66C2;
          font-family: "SF Pro Text", Helvetica, sans-serif;
          margin: 0 auto;
        }
        .libutton:hover {
          background-color: #004182;
        }
      `}</style>
      <a
        className="libutton"
        href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7414854188477837312"
        target="_blank"
        rel="noopener noreferrer"
      >
        Subscribe on LinkedIn
      </a>
    </div>
  );
}
