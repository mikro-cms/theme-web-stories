// Theme componenets
const componentDefault = {
  header: {
    component_name: 'header',
    component_options: {
      title: 'Web Stories',
      logo: {
        name: 'logo',
        mime: 'image/svg',
        extension: '.svg',
        version: 1
      }
    }
  },
  content: {
    component_name: 'content',
    component_options: {
      // no options
    }
  },
  footer: {
    component_name: 'footer',
    component_options: {
      // no options
    }
  }
};

module.exports = {
  default: componentDefault
};
