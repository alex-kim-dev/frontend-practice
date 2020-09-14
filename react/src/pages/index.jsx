import React from 'react';

const data = [
  ['article-preview-component', 'Arcticle preview component'],
  ['base-apparel-coming-soon-page', 'Base Apparel'],
  ['coding-bootcamp-testimonials-slider', 'Testimonials slider'],
  ['four-card-feature-section', 'Four Card'],
  ['fylo-data-storage-component', 'Data storage component'],
  ['fylo-landing-page-with-two-column-layout', 'Fylo landing'],
  ['huddle-landing-page-with-alternating-feature-blocks', 'Huddle alternating'],
  ['huddle-landing-page-with-single-introductory-section', 'Huddle single'],
  ['intro-component-with-signup-form', 'Intro component'],
  ['ping-coming-soon-page', 'Ping'],
  ['single-price-grid-component', 'Single price component'],
  ['pricing-component-with-toggle', 'Pricing component'],
  ['social-media-dashboard-with-theme-switcher', 'Social media dashboard'],
  ['project-tracking-intro-component', 'Project tracking intro'],
  ['rock-paper-scissors', 'Rock paper scissors'],
];

const HomePage = () => (
  <>
    <h1>Index</h1>
    <ul>
      {data.map(([href, label]) => (
        <li>
          <a href={href}>{label}</a>
        </li>
      ))}
    </ul>
  </>
);

export default HomePage;
