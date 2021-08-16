// Theme data
const defaultData = async function () {
  const header = this.res.locals.components.header.component_options;
  const content = this.res.locals.components.content.component_options;

  let data = {
    posts: null
  };

  this.req.query.type = content.type;

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
      type: 'lasted'
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
