import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

function Card(article) {
  return <><Link to={article.article.slug} className='card link-no-underline'>
  <img src={article.article.image} class="card-img-top"></img>
  <div class="card-body">
    <h5 class="card-title">{article.article.title}</h5>
    <p class="card-text">{article.article.content}...</p>
    <a href="#" class="btn btn-primary">Читать</a>
  </div>
</Link>
</>
}

export default class Theory extends Component {
  constructor(props) {
    super(props)

    axios.get('http://127.0.0.1:8000/api/v1/theorylist/').then((res) => {
      this.setState({articles: res.data})
    })

    this.state = {
      articles: []
    }

  };

  render() {
    return (
      <div className='article-grid'>
        { this.state.articles.map((article) => <Card key={article.slug} article={ article }/>) }
      </div>
    )
  }
}
