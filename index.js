// Theme data
const defaultData = async function () {
  let data = {
    posts: null
  };

  this.req.query.type = 'lasted';

  let apiWebStories = this.api('@mikro-cms/api-web-stories');

  listStatus = await apiWebStories('/status');

  if (listStatus.status === 200) {
    data.posts = listStatus.posts;
  }

  return data;
}

// Theme componenets
const componentDefault = {
  data: defaultData,
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
