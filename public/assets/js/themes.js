 function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('selectedTheme', theme);
  }

  document.querySelectorAll('.theme-controller').forEach(function(element) {
    element.addEventListener('change', function() {
      applyTheme(this.value);
    });
  });

  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    applyTheme(savedTheme);
    document.querySelector('.theme-controller[value="' + savedTheme + '"]').checked = true;
  }