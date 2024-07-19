class Api::SearchesController < Api::ApiController
  # GET api/searches
  # @route GET /api/searches {export: true} (api_searches)
  def index
    render json: SearchSerializer.many(
      PgSearch.multisearch(params[:search])
        .order(:searchable_type, :content),
    )
  end

end
