// Theme componenets
const components = {
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
      stories: [
        {
          content: 'create your own history',
          img: {
            name: '0',
            mime: 'image/jpg',
            extension: '.jpg'
          },
          background: 'white'
        }
      ]
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
  components
};
