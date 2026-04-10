export const scrollToSection = (sectionId: string) => {
  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, 120);
};

export const scrollToPricing = (e?: React.MouseEvent) => {
  e?.preventDefault();
  scrollToSection('pricing-section');
};

export const openWhatsApp = () => {
  window.open(
    'https://wa.me/5562994019788?text=quero%20o%20teste',
    '_blank'
  );
};
