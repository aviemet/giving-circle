class Api::PresentationsController < ApplicationController

  def index
    render inertia: "Api::Presentations/Index"
  end

  def show
    render inertia: "Api::Presentations/Show"
  end

  def new
    render inertia: "Api::Presentations/New"
  end

  def edit
    render inertia: "Api::Presentations/Edit"
  end

  # @route POST /api/presentations (api_presentations)
  def create
  end

  # @route PATCH /api/presentations/:slug (api_presentation)
  # @route PUT /api/presentations/:slug (api_presentation)
  def update
  end

  def destroy
  end
end
