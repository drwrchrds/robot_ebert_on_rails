class AddBoxOfficeDataToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :box_office_data, :jsonb

    Movie.all.each do |movie|
      box_office_ranks = movie.box_office_days.map(&:bomojo_rank)
      box_office_ranks = box_office_ranks.compact

      lowest_rank = box_office_ranks.min
      days_at_best_box_office_rank = box_office_ranks.count(lowest_rank)

      movie.update(box_office_data: {
                     best_rank: box_office_ranks.min,
                     days_at_best_rank: days_at_best_box_office_rank
                   })
    end
  end
end
