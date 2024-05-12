import React, { Component } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'


export default class Theory extends Component {
  constructor(props) {
    super(props)

    axios.get('http://127.0.0.1:8000/api/v1/theorylist/').then((res) => {
      this.setState({articles: res.data})
    })

    this.state = {
      articles: []
    }

  }

  render() {
    return (
      <div className='article-grid'>
        {
        this.state.articles.map((article) => <Link to={article.slug} className='card'>
          <img src={article.image} class="card-img-top"></img>
            <div class="card-body">
              <h5 class="card-title">{article.title}</h5>
              <p class="card-text">{article.content}...</p>
              <a href="#" class="btn btn-primary">Читать</a>
            </div>
        </Link>)
        }
        <div className='content'>
          
        </div>
      </div>
    )
  }
}
