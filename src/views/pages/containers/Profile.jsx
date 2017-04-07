import React, { Component, PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import api from '../../../api';
import styles from './Page.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [
      user,
      posts,
    ] = await Promise.all([
      api.users.getSingle(this.props.match.params.id),
      api.users.getPosts(this.props.match.params.id),
    ]);

    this.setState({
      user,
      posts,
      loading: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <section name="Profile" className={styles.section}>
        <h2>
          <FormattedMessage 
            id="title.profile"
            values={{
              name: this.state.user.name,
            }}
          />
        </h2>

        <section className={styles.main}>
          <fieldset className={styles.field}>
            <FormattedMessage id="profile.field.basic" tagName="legend" />
            <FormattedMessage id="email" tagName="label" />
            <span>{ this.state.user.email }</span><br/>
            <FormattedMessage id="username" tagName="label" />
            <span>{ this.state.user.username }</span><br/>
            <FormattedMessage id="phone" tagName="label" />
            <span>{ this.state.user.phone }</span>
          </fieldset>

          {this.state.user.address && (
            <fieldset className={styles.field}>
              <FormattedMessage id="profile.field.address" tagName="legend" />
              <address>
                {this.state.user.address.street}<br />
                {this.state.user.address.suite}<br />
                {this.state.user.address.city}<br />
                {this.state.user.address.zipcode}<br />
              </address>
            </fieldset>
          )}
        </section>

        <section className={styles.list}>
          {this.state.posts
              .map(post => (
                <Post
                  key={post.id}
                  user={this.state.user}
                  {...post}
                />
              ))
            }
        </section>

      </section>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Profile.defaultProps = {
  match: {},
};

export default Profile;
