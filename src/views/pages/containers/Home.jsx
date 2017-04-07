import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' // ES6
import { connect } from 'react-redux';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import styles from './Page.css';

import actions from '../../../actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFecth();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFecth() {
    await this.props.actions.postNextPage();
    this.setState({ loading: false });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        await this.props.actions.postNextPage();
        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="Home" className={styles.section}>
        <FormattedMessage id="title.home" tagName="h1" />
        <section className={styles.list}>
          <ReactCSSTransitionGroup
            transitionName={{
              enter: styles.enter,
              enterAction: styles.enterAction,
              appear: styles.appear,
              appearActive: styles.appearActive,
              leaver: styles.leaver,
              leaverActive: styles.leaverActive,
            }}
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.props.posts
              .map(post => <Post key={post.get('id')} {...post.toJS()} />)
              .toArray()
            }
            {this.state.loading && (
              <Loading />
            )}
          </ReactCSSTransitionGroup>
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func),
  posts: PropTypes.objectOf(PropTypes.object),
};

function mapStateToProps(state) {
  return {
    posts: state.get('posts').get('entities')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);