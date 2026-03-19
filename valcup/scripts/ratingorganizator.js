document.addEventListener('DOMContentLoaded', function () {
      var openBtn = document.getElementById('openModalBtn');
      var closeBtn = document.getElementById('closeModalBtn');
      var submitBtn = document.getElementById('submitModalBtn');
      var overlay = document.getElementById('modalOverlay');
      var modalWindow = document.getElementById('modalWindow');

      function openModal() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          overlay.classList.add('modal-active');
        });
      }

      function closeModal() {
        overlay.classList.remove('modal-active');
        overlay.addEventListener('transitionend', function handler() {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
          overlay.removeEventListener('transitionend', handler);
        });
      }

      openBtn.addEventListener('click', openModal);
      closeBtn.addEventListener('click', closeModal);
      submitBtn.addEventListener('click', closeModal);

      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) {
          closeModal();
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.style.display === 'flex') {
          closeModal();
        }
      });
    });