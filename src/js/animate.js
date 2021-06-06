//// IntersectionObserver JavaScript
'use strict';

const {doc} = require('prettier');
const nav = document.querySelector('.navigation__bar');

///////////////////////////////
/// PAGE NAVIGATION

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document
  .querySelector('.navigation__list') // Parent Element
  .addEventListener('click', function (e) {
    e.preventDefault();
    if (e.target.classList.contains('navigation__link')) {
      const id = e.target.getAttribute('href');
      console.log(id);
      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
      });
    }
  });

///////////////////////////////
/// STICKY NAVIGATION: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////
/// REVEAL SECTIONS

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
