(function () {
  // Videos: load a YouTube player only when the visitor taps play.
  document.querySelectorAll('.video button[data-yt]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + btn.getAttribute('data-yt') + '?autoplay=1&rel=0';
      f.title = btn.getAttribute('data-title') || 'Houdana video';
      f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      btn.replaceWith(f);
    });
  });

  // The one self-hosted clip: swap the poster for a player on tap, so nothing downloads until then.
  document.querySelectorAll('.video button[data-mp4]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var v = document.createElement('video');
      v.src = btn.getAttribute('data-mp4');
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      v.setAttribute('aria-label', btn.getAttribute('aria-label').replace('Play video: ', ''));
      btn.replaceWith(v);
      v.focus();
    });
  });

  var form = document.getElementById('inquiry');
  if (!form) return;

  // Party date can't be in the past.
  var date = document.getElementById('f-date');
  var d = new Date();
  date.min = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  // Form: check the required fields, put the date and town in the email subject, then send.
  var status = document.getElementById('form-status');
  form.addEventListener('submit', function (e) {
    var v = function (id) { return document.getElementById(id).value.trim(); };
    var missing = [];
    if (!v('f-name')) missing.push('your name');
    if (!v('f-contact')) missing.push('a phone number or email');
    if (!v('f-date')) missing.push('the party date');
    if (missing.length) {
      e.preventDefault();
      var list = missing.length > 1 ? missing.slice(0, -1).join(', ') + ' and ' + missing[missing.length - 1] : missing[0];
      status.textContent = 'Add ' + list + ' so Dana can reply.';
      document.getElementById(!v('f-name') ? 'f-name' : !v('f-contact') ? 'f-contact' : 'f-date').focus();
      return;
    }
    var pretty = new Date(v('f-date') + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    document.getElementById('f-subject').value = 'Magic show inquiry: ' + pretty + (v('f-town') ? ' in ' + v('f-town') : '');
    status.textContent = 'Sending to Dana...';
  });
})();
