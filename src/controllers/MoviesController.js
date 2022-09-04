const knex = require('../database/knex');

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body;
    const { user_id } = request.params;

    const movie_id = await knex('movies').insert({
      title,
      description,
      rating,
      user_id
    });

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        user_id,
        name
      };
    });

    await knex('tags').insert(tagsInsert);

    return response.json();
  };

};

module.exports = MoviesController;