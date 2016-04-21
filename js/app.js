var allMovies = [
    {
        "name": "Cars",
        "company": "Pixar",
        "url": "http://www.imdb.com/title/tt0317219/?ref_=nv_sr_1",
        "image": "http://ia.media-imdb.com/images/M/MV5BMTE5Mzk5MTA2Ml5BMl5BanBnXkFtZTYwNTY3NTc2._V1_SY317_CR0,0,214,317_AL_.jpg"
    },
    {
        "name": "How to Train Your Dragon",
        "company": "Dreamworks",
        "url": "http://www.imdb.com/title/tt0892769/?ref_=nv_sr_2",
        "image": "http://ia.media-imdb.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_SX214_AL_.jpg"
    },
    {
        "name": "Toy Story",
        "company": "Pixar",
        "url": "http://www.imdb.com/title/tt0114709/?ref_=nv_sr_2",
        "image": "http://ia.media-imdb.com/images/M/MV5BMTgwMjI4MzU5N15BMl5BanBnXkFtZTcwMTMyNTk3OA@@._V1_SY317_CR12,0,214,317_AL_.jpg"
    },
    {
        "name": "Kung Fu Panda",
        "company": "Dreamworks",
        "url": "http://www.imdb.com/title/tt0441773/?ref_=nv_sr_1",
        "image": "http://ia.media-imdb.com/images/M/MV5BMTIxOTY1NjUyN15BMl5BanBnXkFtZTcwMjMxMDk1MQ@@._V1_SX214_AL_.jpg"
    },
    {
        "name": "Finding Nemo",
        "company": "Pixar",
        "url": "http://www.imdb.com/title/tt0266543/?ref_=nv_sr_1",
        "image": "http://ia.media-imdb.com/images/M/MV5BMTY1MTg1NDAxOV5BMl5BanBnXkFtZTcwMjg1MDI5Nw@@._V1_SY317_CR0,0,214,317_AL_.jpg"
    },
    {
        "name": "The Croods",
        "company": "Dreamworks",
        "url": "http://www.imdb.com/title/tt0481499/?ref_=nv_sr_1",
        "image": "http://ia.media-imdb.com/images/M/MV5BMTcyOTc2OTA1Ml5BMl5BanBnXkFtZTcwOTI1MjkzOQ@@._V1_SY317_CR0,0,214,317_AL_.jpg"
    }
];


// Ideally these React classes should be on separate modular files however due to time constraints I have put them in the same file.
// In an ideal situation I would create new files per React class and use libraries such as Gulp and Grunt to compile the code together
// Apologies in advance for the messy code!

var FilterList = React.createClass({
    getInitialState: function() {
        var allCompanies = this.props.movies.sort(function(a,b) {
            if (a.name < b.name) {
                return -1;
            } else if (a.name > b.name) {
                return 1;
            } else {
                return 0;
            }
        }),
            movieCompanies = [];
        for (var i = 0; i < allCompanies.length; i++) {
            if (movieCompanies.indexOf(allCompanies[i]["company"]) === -1) {
                movieCompanies.push(allCompanies[i]["company"]);
            }
        }
        return {
            companies: movieCompanies.sort(),
            filter: "",
            movies: allCompanies
        };
    },
    filterCompany: function(event) {
        this.setState({
            filter: event.target.value
        });
    },
    render: function() {
        var i = 2;
        var companyOptions = this.state.companies.map(function(company) {
            return (
                <option key={i++} value={company}>{company}</option>
            );
        });
        return (
            <div>
                <div className="select-box">
                  <span className="title">Company:</span>
                  <select onChange={this.filterCompany}>
                    <option key="1" value="">All</option>
                    {companyOptions}
                  </select>
              </div>
              <MovieList movies={this.state.movies} companyFilter={this.state.filter}/>
            </div>
        );
    }
});

var MovieList = React.createClass({
    getInitialState: function() {
        return {
            filteredMovies: this.props.movies
        };
    },
    componentWillReceiveProps: function(nextProps) {
        var movieList = [],
            completeList = nextProps.movies;
        if (nextProps.companyFilter !== "") {
            for (var i = 0; i < completeList.length; i++) {
                if (completeList[i]["company"] === nextProps.companyFilter) {
                    movieList.push(completeList[i]);
                }
            }
        } else {
            movieList = completeList;
        }
        this.setState({
            filteredMovies: movieList
        });
    },
    render: function() {
        var i = 1;
        var bigMovieList = this.state.filteredMovies.map(function(movie) {
            return (
                <div key={i++} className="movies">
                    <img src={movie.image}/>
                    <a href={movie.url} target="_blank" className="movie-description">
                        <p><span className="title">Name: </span>{movie.name}</p>
                        <p><span className="title">Company: </span>{movie.company}</p>
                    </a>
                </div>
            )
        })
        return (
            <div>{bigMovieList}</div>
        )
    }
})

ReactDOM.render(
  <FilterList movies={allMovies} />,
  document.getElementById('movie-list')
);