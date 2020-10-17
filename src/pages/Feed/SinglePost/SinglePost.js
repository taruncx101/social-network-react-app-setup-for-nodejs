import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
    apiBaseUrl: "http://localhost:8001",
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const url = `${this.state.apiBaseUrl}/feed/post/${postId}`
    fetch(url, {
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch status");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          title: resData.post.title,
          author: resData.post.creator.name,
          date: new Date(resData.post.createdAt).toLocaleDateString("en-US"),
          content: resData.post.content,
          image: `${this.state.apiBaseUrl}/${resData.post.imageUrl}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
