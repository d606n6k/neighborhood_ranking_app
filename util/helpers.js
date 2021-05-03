module.exports = {
  // add helper functions for handlebars here
  // Example:
  // json: object => JSON.stringify(object, null, 4),
  format_stars: (avgrank) => {
    const stars = '<span class="icon"><i class="fas fa-star"></i></span>'
    if (avgrank > 4) {
      return `${stars} | ${stars} | ${stars} | ${stars} | ${stars}`;
    }
    else if (avgrank > 3) {
      return `${stars} | ${stars} | ${stars} | ${stars}`;
    }
    else if (avgrank > 2) {
      return `${stars} | ${stars} | ${stars}`;
    }
    else if (avgrank > 1) {
      return `${stars} | ${stars}`;
    } else return `${stars}`;
  },
};
