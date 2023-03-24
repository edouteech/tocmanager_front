export default ({ app }) => {
    if (process.client) {
      window.addEventListener("load", function() {
        const element = document.querySelector(".w-webflow-badge");
        if (element) {
          element.remove();
        }
      });
    }
  };