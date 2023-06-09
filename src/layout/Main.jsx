import React from 'react';
import { MoviesList } from '../components/MoviesList';
import { Preloader } from '../components/Preloader';
import { Search } from '../components/Search';

export class Main extends React.Component {
	state = {
		movies: [],
		loading: true,
	};

	//Запрос на сервер при монтировании
	componentDidMount() {
		fetch('https://www.omdbapi.com/?apikey=1b111e43&type=&s=Spider-Man')
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search, loading: false }))
			.catch(error => {
				console.error(error);
				this.setState({ loading: false });
			});
	}

	//Функция для передачи в компонент <Search /> и в Search.jsx (в props). Реализация поиска по введенным данным
	searchMovies = (string, type = '&') => {
		this.setState({ loading: true });
		fetch(`https://www.omdbapi.com/?apikey=1b111e43&s=${string}&type=${type}`)
			.then(response => response.json())
			.then(data => this.setState({ movies: data.Search, loading: false }))
			.catch(error => {
				console.error(error);
				this.setState({ loading: false });
			});
	};

	render() {
		const { movies, loading } = this.state;
		return (
			<main className='container content-app'>
				<Search searchMovies={this.searchMovies} />{/*Передача searchMovies в Search.jsx для последующего вызова в нем*/}
				{
					/*Передача в MoviesList = Если загрузка true - отрисовка прелоадера, если false - полученные данных*/
					loading ? <Preloader /> : <MoviesList movies={movies} />
				}
			</main>
		);
	}
}
