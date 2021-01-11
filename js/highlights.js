AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },
  update: function () {
    const fadeBackgroundEl = document.querySelector("#fadeBackground");

    //check if the infoBanner plane already has comic text info child entity
    //if so remove the child to avoid the overlapping of the text
    c = fadeBackgroundEl.children;
    if (c.length > 0) {
      var i;
      for (i = 0; i <= c.length; i++) {
        fadeBackgroundEl.removeChild(c[i]);
      }
    } else {
      this.handleMouseClickEvents();
    }
  },
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      const id = this.el.getAttribute("id");
      const postersId = [
        "superman",
        "spiderman",
        "captain-aero",
        "outer-space",
      ];
      if (postersId.includes(id)) {
        const postersContainer = document.querySelector("#posters-container");
        postersContainer.setAttribute("cursor-listener", {
          selectedItemId: id,
        });
        this.el.setAttribute("material", { color: "#1565c0" });
      }
    });
  },
  handleMouseLeaveEvents: function () {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const { selectedItemId } = this.data;
      if (selectedItemId) {
        const el = document.querySelector(`#${selectedItemId}`);
        const id = el.getAttribute("id");
        if (id == selectedItemId) {
          el.setAttribute("material", { color: "#fff" });
        }
      }
    });
  },
  handleMouseClickEvents: function () {
    // Mouse Click Events
    this.el.addEventListener("click", () => {
      const { selectedItemId } = this.data;

      const fadeBackgroundEl = document.querySelector("#fadeBackground");
      const titleEl = document.querySelector("#app-title");
      const cursorEl = document.querySelector("#camera-cursor");

      //check the selected item to set the "info-banner" component on the plane
      if (selectedItemId) {
        fadeBackgroundEl.setAttribute("visible", true);
        fadeBackgroundEl.setAttribute("info-banner", {
          itemId: selectedItemId,
        });
        titleEl.setAttribute("visible", false);
        cursorEl.setAttribute("position", { x: 0, y: 0, z: -1 });
        cursorEl.setAttribute("geometry", {
          radiusInner: 0.03,
          radiusOuter: 0.04,
        });
      } else {
        //else make the plane invisible
        fadeBackgroundEl.setAttribute("visible", false);
        titleEl.setAttribute("visible", true);
        cursorEl.setAttribute("position", { x: 0, y: 0, z: -3 });
        cursorEl.setAttribute("geometry", {
          radiusInner: 0.08,
          radiusOuter: 0.12,
        });
      }
    });
  },
});
