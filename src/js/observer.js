function runObserver() {
  function observerCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('to-be-animated')) {
          entry.target.classList.add('faded-in');
        } else if (entry.target.classList.contains('languages__item')) {
          entry.target.classList.add('active');
        };
      }
    });
  }

  let observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  }

  const OBSERVER = new IntersectionObserver(observerCallback, observerOptions);

  const TARGETS = document.querySelectorAll('.to-be-animated');
  TARGETS.forEach(el => OBSERVER.observe(el));

  const LANG_BARS = document.querySelectorAll('.languages__item');
  LANG_BARS.forEach(el => OBSERVER.observe(el));
}
