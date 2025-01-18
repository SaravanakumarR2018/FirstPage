// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-content');

  faqContainer.addEventListener('click', (e) => {
    const groupHeader = e.target.closest('.faq-group-header');

    if (!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector('.faq-group-body');
    const icon = groupHeader.querySelector('i');

    // Toggle icon
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    // Toggle visibility of body
    groupBody.classList.toggle('open');

    // Save FAQ state to localStorage
    const groupId = group.getAttribute('id');
    const isOpen = groupBody.classList.contains('open');
    localStorage.setItem(`faq-group-${groupId}`, isOpen);

    // Close other open FAQ bodies
    const otherGroups = faqContainer.querySelectorAll('.faq-group');

    otherGroups.forEach((otherGroup) => {
      if (otherGroup !== group) {
        const otherGroupBody = otherGroup.querySelector('.faq-group-body');
        const otherIcon = otherGroup.querySelector('.faq-group-header i');

        otherGroupBody.classList.remove('open');
        otherIcon.classList.remove('fa-minus');
        otherIcon.classList.add('fa-plus');

        // Update localStorage for closed groups
        const otherGroupId = otherGroup.getAttribute('id');
        localStorage.setItem(`faq-group-${otherGroupId}`, false);
      }
    });
  });

  // Restore FAQ state from localStorage
  const faqGroups = faqContainer.querySelectorAll('.faq-group');
  faqGroups.forEach((group) => {
    const groupId = group.getAttribute('id');
    const isOpen = localStorage.getItem(`faq-group-${groupId}`) === 'true';
    const groupBody = group.querySelector('.faq-group-body');
    const icon = group.querySelector('.faq-group-header i');

    if (isOpen) {
      groupBody.classList.add('open');
      icon.classList.remove('fa-plus');
      icon.classList.add('fa-minus');
    } else {
      groupBody.classList.remove('open');
      icon.classList.remove('fa-minus');
      icon.classList.add('fa-plus');
    }
  });
});

// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const mobileMenu = document.querySelector('.mobile-menu');

  // Toggle mobile menu visibility
  hamburgerButton.addEventListener('click', () =>
    mobileMenu.classList.toggle('active')
  );

  // Close the mobile menu when clicking outside or selecting a menu item
  document.addEventListener('click', (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !hamburgerButton.contains(e.target)
    ) {
      mobileMenu.classList.remove('active');
    }
  });

  // Add event listener to menu items
  const menuItems = mobileMenu.querySelectorAll('.menu-item');
  menuItems.forEach((item) =>
    item.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    })
  );
});
