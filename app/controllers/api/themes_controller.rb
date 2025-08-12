class Api::ThemesController < ApplicationController

  def index
    render inertia: "Api::Themes/Index"
  end

  def show
    render inertia: "Api::Themes/Show"
  end

  def new
    render inertia: "Api::Themes/New"
  end

  def edit
    render inertia: "Api::Themes/Edit"
  end

  # @route POST /api/themes (api_themes)
  def create
  end

  # @route PATCH /api/themes/:theme_slug (api_theme)
  # @route PUT /api/themes/:theme_slug (api_theme)
  def update
  end

  def destroy
  end
end
