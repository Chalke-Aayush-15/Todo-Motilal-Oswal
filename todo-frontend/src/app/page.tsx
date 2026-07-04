"use client";

import Link from "next/link";
import "./home.css";

export default function Home() {

  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>
            Organize Your Day
            <span> Effortlessly</span>
          </h1>

          <p>
            Manage tasks, stay productive, and never miss important work
            again with ITs-TODO-App.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">
              <Link href="/login">Get Started</Link>
            </button>

            <button className="secondary-btn">
              Learn More
            </button>
          </div>
        </div>

        <div className="hero-card">
          <div className="task-card">
            <h3>Today's Tasks</h3>

            <div className="task completed">
              ✓ Complete UI Design
            </div>

            <div className="task">
              ○ Connect Backend APIs
            </div>

            <div className="task">
              ○ Deploy Application
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose ITs-TODO-App?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>⚡ Fast</h3>
            <p>
              Create and manage tasks instantly.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure</h3>
            <p>
              Your tasks remain protected and private.
            </p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>
              Works perfectly on desktop, tablet, and mobile.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Boost Productivity?</h2>

        <p>
          Start managing your tasks smarter today.
        </p>

        <button className="primary-btn" >
          <Link href="/register">Create Account</Link>
        </button>
      </section>
    </main>
  );
}