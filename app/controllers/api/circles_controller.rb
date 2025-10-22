class Api::CirclesController < Api::ApiController
  # @route GET /api/circles/:circle_slug/mock (api_circle_mock)
  def mock
    circle = MockCircle.includes_associated.first
    render json: Circles::MockSerializer.render(circle)
  end

  # @route POST /api/circles (api_circles)
  def create
  end

  # @route PATCH /api/circles/:slug (api_circle)
  # @route PUT /api/circles/:slug (api_circle)
  def update
  end
end
