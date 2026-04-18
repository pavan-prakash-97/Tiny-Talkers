// export const handleWhatsApp = () => {
//   const number = "918661025067";
//   const message = encodeURIComponent(
//     "Hi, I am interested in Tiny Talkers Summer Camp"
//   );

//   window.open(`https://wa.me/${number}?text=${message}`, "_blank");
// };

export const handleWhatsApp = (customMessage?: string) => {
  const number = "918660125067";

  const defaultMessage = "Hi, I am interested in Tiny Talkers Summer Camp";

  const message = encodeURIComponent(customMessage || defaultMessage);

  window.open(`https://wa.me/${number}?text=${message}`, "_blank");
};

export const handleInstagram = () => {
  window.open(
    "https://www.instagram.com/tiny_talkers_learning_hub/",
    "_blank"
  );
};